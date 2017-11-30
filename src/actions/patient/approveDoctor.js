import {
  APPROVE_DOCTOR_SUCCESS,
  APPROVE_DOCTOR_REQUEST
} from "../../constants/patient/action";
import ContractService from '../../utils/ContractService';

const update =
  () =>
    ({
      type: APPROVE_DOCTOR_SUCCESS
    });

export const approve =
  (doctorAddress) =>
    (dispatch, getState) => {

      dispatch({
        type: APPROVE_DOCTOR_REQUEST
      });

      ContractService
        .acceptDoctorForPatient(getState().web3.instance, doctorAddress)
        .then((err, res) => dispatch(update()))
        .catch(console.log)
    };