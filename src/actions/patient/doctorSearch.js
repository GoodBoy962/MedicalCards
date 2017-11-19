import {
  FIND_DOCTOR_REQUEST,
  FIND_DOCTOR_SUCCESS
} from "../../constants/patient/action";
import ContractService from '../../utils/ContractService';

const update = (doctorAddress, doctor, accepted) => ({
  type: FIND_DOCTOR_SUCCESS,
  doctorAddress: doctorAddress,
  doctor: doctor,
  accepted: accepted
});

export const find = (doctorAddress, patientAddress) =>
  (dispatch, getState) => {

    dispatch({
      type: FIND_DOCTOR_REQUEST,
      doctorAddress: doctorAddress,
      doctor: null,
      accepted: null
    });

    const web3 = getState().web3.instance;
    ContractService.getDoctor(web3, doctorAddress)
      .then((doctor) => {
        ContractService.isPatientAvailableForDoctor(web3, patientAddress, doctorAddress)
          .then(accepted => {
            setTimeout(() => dispatch(update(doctorAddress, doctor, accepted)), 1000);
          }).catch(console.log);
      }).catch(console.log)
  };