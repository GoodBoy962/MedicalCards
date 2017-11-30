import {
  GET_INCOMING_REQUESTS_SUCCESS,
  GET_INCOMING_REQUESTS_REQUEST
} from '../../constants/patient/action';
import ContractService from '../../utils/ContractService';

const update =
  list =>
    ({
      type: GET_INCOMING_REQUESTS_SUCCESS,
      list
    });

export const load =
  () =>
    (dispatch, getState) => {

      dispatch({
        type: GET_INCOMING_REQUESTS_REQUEST
      });

      const web3 = getState().web3.instance;
      const privateKey = getState().account.privateKey;
      const contract = getState().web3.contract;
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);

      ContractService.getRequests(web3, account, contract)
        .then(
          requests =>
            setTimeout(() => dispatch(update(requests)), 100))
        .catch(console.log);
    };