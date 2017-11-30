import ContractService from '../../utils/ContractService';
import {
  REGISTER_DOCTOR_SUCCESS,
  REGISTER_DOCTOR_REQUEST
} from '../../constants/welcome/actions';

const update =
  () =>
    ({
      type: REGISTER_DOCTOR_SUCCESS
    });

export const register =
  (name, surname, passport, medClinic, category) =>
    (dispatch, getState) => {

      dispatch({
        type: REGISTER_DOCTOR_REQUEST
      });

      const web3 = getState().web3.instance;
      const privateKey = getState().account.privateKey;
      const publicKey = getState().account.publicKey;
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const contract = getState().web3.contract;


      ContractService.registerDoctor(web3, account, contract, name, surname, passport, medClinic, category, publicKey)
        .then((res, err) => dispatch(update()))
        .catch(console.log)

    };