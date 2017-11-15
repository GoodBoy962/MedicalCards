import ContractService from '../../utils/ContractService';
import {
  REGISTER_DOCTOR_SUCCESS,
  REGISTER_DOCTOR_REQUEST
} from "../../constants/welcome/actions";

export const update = () => ({
  type: REGISTER_DOCTOR_SUCCESS
});

export const register = (name, surname, passport, medClinic, category) =>
  (dispatch, getState) => {

    dispatch({
      type: REGISTER_DOCTOR_REQUEST
    });

    const web3 = getState().web3.instance;
    ContractService.registrateDoctor(web3, name, surname, passport, medClinic, category)
      .then((res, err) => {
        console.log(res);
        console.log(err);
        dispatch(update())
      })
      .catch(console.log)

  };