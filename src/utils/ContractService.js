const contract = require('../properties/MedCardRaw.json');

const ContractService = {

  getEtherbase: function (web3) {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  getAccount: function (web3) {
    return new Promise((resolve, reject) => {
      this.getEtherbase(web3).then((accounts, err) => {
        return accounts[0];
      }).then(etherbase => {
        this.getDoctor(web3, etherbase).then((doctor, err) => {
          if (doctor[0]) {
            resolve({
              type: 'doctor',
              account: doctor,
              etherbase: etherbase
            });
          } else {
            this.getPatient(web3, etherbase).then((patient, err) => {
              if (patient[0]) {
                resolve({
                  type: 'patient',
                  account: patient,
                  etherbase: etherbase
                });
              } else {
                this.getOwner(web3).then((owner) => {
                  if (owner === etherbase) {
                    resolve({
                      type: 'owner',
                      account: owner,
                      etherbase: etherbase
                    });
                  } else {
                    resolve({
                      type: 'new',
                      etherbase: etherbase
                    })
                  }
                }).catch(console.log);
              }
            });
          }
        });
      }).catch(reject);
    });
  },

  getDoctor: function (web3, address) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.methods.doctors(address).call((err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  getPatient: function (web3, address) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.methods.patients(address).call((err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  getOwner: function (web3) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.methods.owner().call((err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  isPatientAvailableForDoctor: function (web3, patientAddress, doctorAddress) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.methods
        .checkIfPatientAvailableForDoctor(patientAddress, doctorAddress).call((err, res) => {
        resolve(res);
        reject(err);
      });
    })
  },

  getPatientProfile: function (web3, doctorAddress, patientAddress) {
    return new Promise((resolve, reject) => {
      this.getPatient(web3, patientAddress).then((patient, err) => {
        if (patient) {
          this.isPatientAvailableForDoctor(web3, patientAddress, doctorAddress)
            .then((available, err) => {
              if (available) {
                this.getPatientRecords(web3, patientAddress).then((records, err) => {
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
    });
  },

  getDoctorProfile: function (web3, doctorAddress, patientAddress) {
    return new Promise((resolve, reject) => {
      this.getDoctor(web3, doctorAddress).then((doctor) => {
        if (doctor) {
          this.isPatientAvailableForDoctor(web3, patientAddress, doctorAddress)
            .then((accepted, err) => {
              if (doctor[5] === true) {
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
    });
  },

  registrateDoctor: function (web3, name, surname, passport, medClinic, category) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.methods
          .applyDoctor(name, surname, passport, medClinic, category).send({
          from: etherbase[0]
        }, (err, res) => {
          resolve(res);
          reject(err);
        });
      });
    });
  },

  registratePatient: function (web3, name, surname, passport, birthday) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      this.getEtherbase(web3).then((etherbase) => {
        medCardContract.methods
          .applyPatient(name, surname, passport, birthday).send({
          from: etherbase[0]
        }, (err, res) => {
          resolve(res);
          reject(err);
        });
      });
    });
  },

  getPatientRecords: function (web3, patientAddress) {

    const getPatientRecordsLength = function (web3, patientAddress) {
      const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
      return new Promise((resolve, reject) => {
        ContractService.getEtherbase(web3).then((etherbase) => {
          medCardContract.methods.getPatientRecordsLength(patientAddress).call({
              from: etherbase[0]
            },
            (err, count) => {
              resolve(count);
              reject(err);
            });
        });
      });
    };

    const getPatientRecordByIndex = function (web3, patientAddress, index) {
      const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
      return new Promise((resolve, reject) => {
        ContractService.getEtherbase(web3).then((etherbase, err) => {
          medCardContract.methods.getPatientRecord(patientAddress, index).call({
            from: etherbase[0]
          }, (err, record) => {
            resolve(record);
            reject(err);
          });
        });
      });
    };

    return new Promise((resolve, reject) => {
      this.getEtherbase(web3).then((etherbase, err) => {
        getPatientRecordsLength(web3, patientAddress).then((size, err) => {
          let promises = [];
          for (let i = 0; i < size; i++) {
            promises.push(getPatientRecordByIndex(web3, patientAddress, i));
          }
          Promise.all(promises).then((records, err) => {
            resolve(records);
            reject(err);
          });
        });
      });
    });
  },

  addRecord: function (web3, patientAddress, value) {
    return new Promise((resolve, reject) => {
      const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.methods.addRecord(patientAddress, value).send({
          from: etherbase[0]
        }, (err, res) => {
          resolve(res);
          reject(err);
        });
      });
    });
  },

  request: function (web3, patientAddress) {
    return new Promise((resolve, reject) => {
      const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.methods.request(patientAddress).send({
          from: etherbase[0]
        }, (err, res) => {
          resolve(res);
          reject(err);
        })
      })
    })
  },

  getRequests: function (web3) {

    const getRequestsLength = function (web3) {
      const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
      return new Promise((resolve, reject) => {
        ContractService.getEtherbase(web3).then((etherbase) => {
          medCardContract.methods.getRequestsLength().call({
              from: etherbase[0]
            },
            (err, count) => {
              resolve(count);
              reject(err);
            });
        });
      });
    };

    const getRequestByIndex = function (web3, index) {
      const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
      return new Promise((resolve, reject) => {
        ContractService.getEtherbase(web3).then((etherbase, err) => {
          medCardContract.methods.getRequest(index).call({
            from: etherbase[0]
          }, (err, record) => {
            resolve(record);
            reject(err);
          });
        });
      });
    };

    return new Promise((resolve, reject) => {
      getRequestsLength(web3).then((size, err) => {
        let promises = [];
        for (let i = 0; i < size; i++) {
          promises.push(getRequestByIndex(web3, i));
        }
        Promise.all(promises).then((requests, err) => {
          resolve(requests);
          reject(err);
        });
      });
    });
  },

  considerRequest: function (web3, index, decision) {
    return new Promise((resolve, reject) => {
      const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.methods.considerRequest(index, decision).send({
          from: etherbase[0]
        }, (err, res) => {
          resolve(res);
          reject(err);
        });
      });
    });
  }

};

export default ContractService;
