import ContractService from '../../utils/ContractService';
import {
  REGISTER_PATIENT_SUCCESS,
  REGISTER_PATIENT_REQUEST
} from "../../constants/welcome/actions";

const update = () => ({
  type: REGISTER_PATIENT_SUCCESS
});

export const register = (name, surname, passport, birthday) =>
  (dispatch, getState) => {

    dispatch({
      type: REGISTER_PATIENT_REQUEST
    });

    const web3 = getState().web3.instance;
    ContractService.registratePatient(web3, name, surname, passport, birthday)
      .then((res, err) => dispatch(update()))
      .catch(console.log)

  };