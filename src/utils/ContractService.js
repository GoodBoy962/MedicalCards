const contractAddress = require('../properties/MedCardRaw.json').address;

const ContractService = {

    getAccount: (web3, contract, account) => {
      return new Promise((resolve, reject) => {
        const address = account.address;
        ContractService.getDoctor(web3, contract, address)
          .then(
            (doctor, err) => {
              if (doctor[0]) {
                resolve({
                  type: 'doctor',
                  account: doctor,
                  etherbase: address
                });
              } else {
                ContractService.getPatient(web3, contract, address)
                  .then(
                    (patient, err) => {
                      if (patient[0]) {
                        resolve({
                          type: 'patient',
                          account: patient,
                          etherbase: address
                        });
                      } else {
                        ContractService.getOwner(web3, contract)
                          .then(
                            owner => {
                              if (owner === address) {
                                resolve({
                                  type: 'owner',
                                  account: owner,
                                  etherbase: address
                                });
                              } else {
                                resolve({
                                  type: 'new',
                                  account: null,
                                  etherbase: address
                                })
                              }
                            }).catch(console.log);
                      }
                    });
              }
            });
      });
    },

    getDoctor: (web3, contract, address) =>
      new Promise((resolve, reject) => {
        contract.methods.doctors(address)
          .call(
            (err, res) => {
              resolve(res);
              reject(err);
            });
      }),

    getPatient: (web3, contract, address) =>
      new Promise((resolve, reject) => {
        contract.methods.patients(address)
          .call(
            (err, res) => {
              resolve(res);
              reject(err);
            });
      }),

    getOwner: (web3, contract) =>
      new Promise((resolve, reject) => {
        contract.methods.owner()
          .call(
            (err, res) => {
              resolve(res);
              reject(err);
            });
      }),

    isPatientAvailableForDoctor: (web3, contract, patientAddress, doctorAddress) =>
      new Promise((resolve, reject) => {
        contract.methods.isPatientAvailableForDoctor(patientAddress, doctorAddress)
          .call(
            (err, res) => {
              resolve(res);
              reject(err);
            });
      }),

    getPatientProfile: (web3, account, contract, doctorAddress, patientAddress) =>
      new Promise((resolve, reject) => {
        ContractService.getPatient(web3, contract, patientAddress).then((patient, err) => {
          if (patient) {
            ContractService.isPatientAvailableForDoctor(web3, contract, patientAddress, doctorAddress)
              .then(
                (available, err) => {
                  if (available) {
                    ContractService.getPatientRecords(web3, account, contract, patientAddress).then((records, err) => {
                      resolve({
                        patient: patient,
                        available: available,
                        records: records
                      });
                      reject(err);
                    });
                  } else {
                    resolve({
                      patient: patient,
                      available: available,
                    });
                    reject(err);
                  }
                });
          }
        });
      }),

    getDoctorProfile: (web3, account, contract, doctorAddress, patientAddress) =>
      new Promise((resolve, reject) => {
        ContractService.getDoctor(web3, contract, doctorAddress).then((doctor) => {
          if (doctor) {
            ContractService.isPatientAvailableForDoctor(web3, contract, patientAddress, doctorAddress)
              .then(
                (accepted, err) => {
                  if (doctor[5]) {
                    resolve({
                      doctor: doctor,
                      accepted: accepted
                    });
                  } else {
                    resolve({
                      doctor: [],
                      accepted: false
                    })
                  }
                  reject(err);
                });
          }
        });
      }),

    registerDoctor: (web3, account, contract, name, surname, passport, medClinic, category, publicKey) =>
      new Promise((resolve, reject) => {

        const method = contract.methods.applyDoctor(name, surname, passport, medClinic, category, publicKey);

        const tx = {
          to: contractAddress,
          data: method.encodeABI(),
          gasLimit: 1000000
        };

        account.signTransaction(tx)
          .then(
            ({rawTransaction}) =>
              web3.eth.sendSignedTransaction(rawTransaction))
          .then(
            receipt =>
              resolve(receipt))
          .catch(
            err =>
              reject(err)
          );

      }),

    registerPatient: (web3, account, contract, name, surname, passport, birthday, publicKey, passphrase) =>
      new Promise((resolve, reject) => {

        const method = contract.methods.applyPatient(name, surname, passport, birthday, publicKey, passphrase);

        const tx = {
          to: contractAddress,
          data: method.encodeABI(),
          gasLimit: 1000000
        };

        account.signTransaction(tx)
          .then(
            ({rawTransaction}) =>
              web3.eth.sendSignedTransaction(rawTransaction))
          .then(
            receipt =>
              resolve(receipt))
          .catch(
            err =>
              reject(err)
          );

      }),

    getPatientRecords: (web3, account, contract, patientAddress) => {

      const getPatientRecordsLength = (web3, account, contract, patientAddress) => {
        return new Promise((resolve, reject) => {
          contract.methods.getPatientRecordsLength(patientAddress)
            .call({
                from: account.address
              },
              (err, count) => {
                resolve(count);
                reject(err);
              });
        });
      };

      const getPatientRecordByIndex = (web3, account, contract, patientAddress, index) => {
        return new Promise((resolve, reject) => {
          contract.methods.getPatientRecord(patientAddress, index)
            .call({
              from: account.address
            }, (err, record) => {
              resolve(record);
              reject(err);
            });
        });
      };

      return new Promise((resolve, reject) => {
        getPatientRecordsLength(web3, account, contract, patientAddress)
          .then(
            size => {
              let promises = [];
              for (let i = 0; i < size; i++) {
                promises.push(getPatientRecordByIndex(web3, account, contract, patientAddress, i));
              }
              Promise.all(promises).then(
                (records, err) => {
                  resolve(records);
                  reject(err);
                });
            })
          .catch(console.log);
      });
    },

    addRecord: (web3, account, contract, patientAddress, value) =>
      new Promise((resolve, reject) => {

        const method = contract.methods.addRecord(patientAddress, value);

        const tx = {
          to: contractAddress,
          data: method.encodeABI(),
          gasLimit: 1000000
        };

        account.signTransaction(tx)
          .then(
            ({rawTransaction}) =>
              web3.eth.sendSignedTransaction(rawTransaction))
          .then(
            receipt =>
              resolve(receipt))
          .catch(
            err =>
              reject(err));
      }),

    request: (web3, account, contract, patientAddress) =>
      new Promise((resolve, reject) => {

        const method = contract.methods.request(patientAddress);

        const tx = {
          to: contractAddress,
          data: method.encodeABI(),
          gasLimit: 1000000
        };

        account.signTransaction(tx)
          .then(
            ({rawTransaction}) =>
              web3.eth.sendSignedTransaction(rawTransaction))
          .then(
            receipt => {
              console.log(receipt);
              resolve(receipt)
            })
          .catch(
            err =>
              reject(err)
          );
      }),

    getRequests: (web3, account, contract) => {

      const getRequestsLength =
        (web3, account, contract) =>
          new Promise((resolve, reject) => {
            contract.methods.getRequestsLength()
              .call({
                  from: account.address
                },
                (err, count) => {
                  resolve(count);
                  reject(err);
                });
          });

      const getRequestByIndex =
        (web3, account, contract, index) =>
          new Promise(
            (resolve, reject) => {
              contract.methods.getRequest(index)
                .call({
                    from: account.address
                  },
                  (err, record) => {
                    resolve(record);
                    reject(err);
                  });
            });

      return new Promise((resolve, reject) => {
        getRequestsLength(web3, account, contract)
          .then(
            size => {
              let promises = [];
              for (let i = 0; i < size; i++) {
                promises.push(getRequestByIndex(web3, account, contract, i));
              }
              Promise.all(promises)
                .then(
                  (requests, err) => {
                    resolve(requests);
                    reject(err);
                  });
            })
          .catch(console.log);
      });
    },

    considerRequest: (web3, account, contract, index, decision, passphrase) =>
      new Promise((resolve, reject) => {

        const method = contract.methods.considerRequest(index, decision, passphrase);

        const tx = {
          to: contractAddress,
          data: method.encodeABI(),
          gasLimit: 1000000
        };

        account.signTransaction(tx)
          .then(
            ({rawTransaction}) =>
              web3.eth.sendSignedTransaction(rawTransaction))
          .then(
            receipt =>
              resolve(receipt))
          .catch(
            err =>
              reject(err));
      }),

    getPatientPassphrase: (web3, account, contract, patientAddress) =>
      new Promise((resolve, reject) => {
        contract.methods
          .getPatientPassphrase(patientAddress, account.address).call({
          from: account.address
        }, (err, passphrase) => {
          resolve(passphrase);
          reject(err);
        });
      })

  }
;

export default ContractService;
