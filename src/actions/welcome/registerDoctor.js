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
  (name, surname, passport, medClinic, category) => {
    return async function (dispatch, getState) {

      dispatch({
        type: REGISTER_DOCTOR_REQUEST
      });

      const web3 = getState().web3.instance;
      const privateKey = getState().account.privateKey;
      const publicKey = getState().account.publicKey;
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const contract = getState().web3.contract;
      const ipfs = getState().ipfs.instance;


      const profile = await ipfs.files.add(JSON.stringify({
          name,
          surname,
          passport,
          medClinic,
          category
        }));
      await ContractService.registerDoctor(web3, account, contract, profile, publicKey)
      dispatch(update());

    }
  };