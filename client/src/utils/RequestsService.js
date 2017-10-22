import axios from 'axios';
import ContractService from './ContractService';

var RequestService = {

  getPatientRequests: function(patientAddress, web3) {

    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8000/doctorRequests/patient', {
        params: {
          patientAddress: patientAddress
        }
      }).then((res, err) => {
        let promises = [];
        for (let i in res.data) {
          promises.push(ContractService.getDoctor(web3, res.data[i].doctorAddress));
        }
        Promise.all(promises).then((doctors, err) => {
          resolve(doctors);
          reject(err);
        });
      });
    })
  }

}

export default RequestService;
