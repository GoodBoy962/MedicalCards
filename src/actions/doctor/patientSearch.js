import {
  FIND_PATIENT_REQUEST,
  FIND_PATIENT_SUCCESS
} from "../../constants/doctor/action";
import ContractService from '../../utils/ContractService';

export const update = (patientAddress, patient, available, records) => ({
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
    ContractService.getPatientProfile(web3, doctorAddress, patientAddress).then(patientProfile => {
      setTimeout(() => dispatch(update(patientAddress, patientProfile.patient, patientProfile.available, patientProfile.records)), 1000)
    }).catch(console.log)
  }
};