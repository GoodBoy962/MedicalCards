import {
  FIND_PATIENT_REQUEST,
  FIND_PATIENT_SUCCESS
} from "../../constants/doctor/action";
import ContractService from '../../utils/ContractService';

const update = (patientAddress, patient, available, records) => ({
  type: FIND_PATIENT_SUCCESS,
  patientAddress,
  patient,
  available,
  records
});

export const find = (doctorAddress, patientAddress) => {
  return (dispatch, getState) => {

    dispatch({
      type: FIND_PATIENT_REQUEST,
      patientAddress: doctorAddress,
      doctor: null,
      accepted: null
    });

    const web3 = getState().web3.instance;
    const ipfs = getState().ipfs.instance;

    ContractService.getPatientProfile(web3, doctorAddress, patientAddress).then(patientProfile => {
      let promises = [];
      for (let i = 0; i < patientProfile.records.length; i++) {
        promises.push(getValue(ipfs, patientProfile.records[i][1], patientProfile.records[i][0]));
      }
      Promise.all(promises)
        .then(records => {
          setTimeout(() => dispatch(
            update(patientAddress, patientProfile.patient, patientProfile.available, records)), 1000)
        })
    }).catch(console.log);
  }
};

const getValue = (ipfs, hash, address) => {
  return new Promise((resolve, reject) => {

    ipfs.files.cat(hash, (e, file) => {
      const chunks = [];

      file.on('data', chunks.push.bind(chunks));

      file.on('end', () => {
        const value = Buffer.concat(chunks).toString();
        resolve({
          address,
          value
        });
      })
    });
  })
};