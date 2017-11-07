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
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.methods.doctors(address).call((err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  getPatient: function(web3, address) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.methods.patients(address).call((err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  getOwner: function(web3, address) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.methods.owner.call((err, res) => {
        resolve(res);
        reject(err);
      });
    });
  },

  isPatientAvailableForDoctor: function(web3, patientAddress, doctorAddress) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      medCardContract.methods
        .checkIfPatientAvailableForDoctor(patientAddress, doctorAddress).call((err, res) => {
          resolve(res);
          reject(err);
        });
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
      this.getDoctor(web3, doctorAddress).then((doctor, err) => {
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

  registrateDoctor: function(web3, name, surname, passport, medClinic, category) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.methods
          .applyDoctor(name, surname, passport, medClinic, category).send({
            from: etherbase[0]
          }, (err, res) => {});
      });
    });
  },

  registratePatient: function(web3, name, surname, passport, birthday) {
    const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
    return new Promise((resolve, reject) => {
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.methods
          .applyPatient(name, surname, passport, birthday).send({
            from: etherbase[0]
          }, (err, res) => {});
      });
    });
  },

  getPatientRecords: function(web3, patientAddress) {

    let getPatientRecordsLength = function(web3, patientAddress) {
      const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
      return new Promise((resolve, reject) => {
        ContractService.getEtherbase(web3).then((etherbase, err) => {
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

    let getPatientRecordByIndex = function(web3, patientAddress, index) {
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

  addRecord: function(web3, patientAddress, value) {
    return new Promise((resolve, reject) => {
      const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.methods.addRecord(patientAddress, value).send({
          from: etherbase[0]
        }, (err, res) => {});
      });
    });
  },

  acceptDoctorForPatient: function(web3, doctorAddress) {
    return new Promise((resolve, reject) => {
      const medCardContract = new web3.eth.Contract(contract.abi, contract.address);
      this.getEtherbase(web3).then((etherbase, err) => {
        medCardContract.methods.acceptDoctorForPatient(doctorAddress).send({
          from: etherbase[0]
        }, (err, res) => {});
      });
    });
  }

}

export default ContractService;
