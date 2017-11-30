import {
  FIND_DOCTOR_REQUEST,
  FIND_DOCTOR_SUCCESS
} from "../../constants/patient/action";
import ContractService from '../../utils/ContractService';

const update =
  (doctorAddress, doctor, accepted) =>
    ({
      type: FIND_DOCTOR_SUCCESS,
      doctorAddress: doctorAddress,
      doctor: doctor,
      accepted: accepted
    });

export const find =
  (doctorAddress, patientAddress) =>
    (dispatch, getState) => {

      dispatch({
        type: FIND_DOCTOR_REQUEST,
        doctorAddress: doctorAddress,
        doctor: null,
        accepted: null
      });

      const web3 = getState().web3.instance;
      const contract = getState().web3.contract;

      ContractService.getDoctor(web3, contract, doctorAddress)
        .then(
          doctor =>
            Promise.all([
              Promise.resolve(ContractService.isPatientAvailableForDoctor(web3, contract, patientAddress, doctorAddress)),
              Promise.resolve(doctor)
            ]))
        .then(
          ([accepted, doctor]) => {
            setTimeout(() =>
              dispatch(update(doctorAddress, doctor, accepted)), 1000);
          })
        .catch(console.log);
    };