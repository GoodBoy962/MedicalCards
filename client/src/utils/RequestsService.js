import axios from 'axios';
import ContractService from './ContractService';

const host = 'http://localhost:8000';

let RequestService = {

  requestPatientPermission: function(patientAddress, doctorAddress) {
    return new Promise((resolve, reject) => {
      axios.post(host + '/doctorRequests', {
        patientAddress: patientAddress,
        doctorAddress: doctorAddress
      }).then((res, err) => {
        resolve(res);
        reject(err);
      });
    });
  },

  getPatientRequests: function(patientAddress, web3) {

    return new Promise((resolve, reject) => {
      axios.get(host + '/doctorRequests/patient', {
        params: {
          patientAddress: patientAddress
        }
      }).then((res, err) => {
        let promises = [];
        for (let i in res.data) {
          promises.push(ContractService.getDoctor(web3, res.data[i].doctorAddress));
        }
        Promise.all(promises).then((doctors, err) => {
          for (let i = 0; i < doctors.length; i++) {
            doctors[i].address = res.data[i].doctorAddress;
          }
          resolve(doctors);
          reject(err);
        });
      });
    })
  },

  isRequested: function(doctorAddress, patientAddress) {

    return new Promise((resolve, reject) => {
      axios.get(host + '/doctorRequests', {
        params: {
          patientAddress: patientAddress,
          doctorAddress: doctorAddress
        }
      }).then((res, err) => {
        resolve(res);
        reject(err);
      });
    });
  }

}

export default RequestService;
