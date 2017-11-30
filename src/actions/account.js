import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS
} from '../constants/actions';
import ContractService from '../utils/ContractService';

import utils from "ethereumjs-util";

const update =
  (account, address, accountType, privateKey, publicKey) => {
    return {
      type: GET_ACCOUNT_SUCCESS,
      account,
      address,
      accountType,
      privateKey,
      publicKey
    }
  };

export const load =
  file => (dispatch, getState) => {

    dispatch({
      type: GET_ACCOUNT_REQUEST
    });

    const web3 = getState().web3.instance;
    const contract = getState().web3.contract;

    const privateKey = JSON.parse(file).pkey;
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const publicKey = utils.bufferToHex(utils.privateToPublic(privateKey));

    ContractService.getAccount(web3, contract, account)
      .then(user => {
        if (user) {
          dispatch(update(user.account, user.etherbase, user.type, privateKey, publicKey));
        } else {
          dispatch(update(null, null, null, privateKey, publicKey));
        }
      })
      .catch(console.log);
  };