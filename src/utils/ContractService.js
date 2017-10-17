const contract = require('../build/contracts/MedCardRaw.json');

var ContractService = {

  getEtherbase: function(web3) {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  getAccount: function(web3) {
    return new Promise((resolve, reject) => {
      this.getEtherbase(web3).then((accounts, err) => {
        const etherbase = accounts[0];
        return etherbase;
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
                this.getOwner(web3, etherbase).then((owner, err) => {
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
                });
              }
            });
          }
        });
      });
    });
  },

  getDoctor: function(web3, address) {
    const medCardContract = web3.eth.contract(contract.abi).at(contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.doctors.call(address, (err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  getPatient: function(web3, address) {
    const medCardContract = web3.eth.contract(contract.abi).at(contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.patients.call(address, (err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  getOwner: function(web3, address) {
    const medCardContract = web3.eth.contract(contract.abi).at(contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.owner.call((err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  isPatientAvailableForDoctor: function(web3, patientAddress, doctorAddress) {
    const medCardContract = web3.eth.contract(contract.abi).at(contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.checkIfPatientAvailableForDoctor.call(
        patientAddress, doctorAddress,
        (err, res) => {
          resolve(res);
          reject(err);
        }
      );
    })
  },

  getPatientProfile: function(web3, doctorAddress, patientAddress) {
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

  getDoctorProfile: function(web3, doctorAddress, patientAddress) {
    return new Promise((resolve, reject) => {
      this.getDoctor(web3, patientAddress).then((doctor, err) => {
        if (doctor) {
          this.isPatientAvailableForDoctor(web3, patientAddress, doctorAddress)
            .then((res, err) => {
              resolve({
                doctor: doctor,
                accepted: res
              });
              reject(err);
            });
        }
      });
    });
  },

  registrateDoctor: function(web3, name, surname, passport, medClinic, category) {
    const medCardContract = web3.eth.contract(contract.abi).at(contract.address);
    return new Promise((resolve, reject) => {
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.applyDoctor(
          name, surname, passport, medClinic, category, {
            from: etherbase[0]
          },
          (err, res) => {}
        );
      });
    });
  },

  registratePatient: function(web3, name, surname, passport, birthday) {
    const medCardContract = web3.eth.contract(contract.abi).at(contract.address);
    return new Promise((resolve, reject) => {
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.applyPatient(
          name, surname, passport, birthday, {
            from: etherbase[0]
          },
          (err, res) => {}
        );
      });
    });
  },

  getPatientRecords: function(web3, patientAddress) {

    let getPatientRecordsLength = function(web3, patientAddress) {
      const medCardContract = web3.eth.contract(contract.abi).at(contract.address);
      return new Promise((resolve, reject) => {
        ContractService.getEtherbase(web3).then((etherbase, err) => {
          medCardContract.getPatientRecordsLength
            .call(patientAddress, {
                from: etherbase[0]
              },
              (err, count) => {
                resolve(count.c[0]);
                reject(err);
              });
        });
      });
    };

    let getPatientRecordByIndex = function(web3, patientAddress, index) {
      const medCardContract = web3.eth.contract(contract.abi).at(contract.address);
      return new Promise((resolve, reject) => {
        ContractService.getEtherbase(web3).then((etherbase, err) => {
          medCardContract.getPatientRecord
            .call(patientAddress, index, {
                from: etherbase[0]
              },
              (err, record) => {
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

  addRecord: function(web3, patientAddress, value) {
    return new Promise((resolve, reject) => {
      const medCardContract = web3.eth.contract(contract.abi).at(contract.address);
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.addRecord(
          patientAddress, value, {
            from: etherbase[0]
          },
          (err, res) => {}
        );
      });
    });
  }

}

export default ContractService;
