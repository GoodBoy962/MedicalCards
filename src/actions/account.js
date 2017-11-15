import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS
} from '../constants/actions';
import ContractService from '../utils/ContractService';

export const update = (account, address, accountType) => {
  return {
    type: GET_ACCOUNT_SUCCESS,
    account,
    address,
    accountType
  }
};

export const load = () => {
  return (dispatch, getState) => {

    dispatch({
      type: GET_ACCOUNT_REQUEST
    });

    const web3 = getState().web3.instance;
    ContractService.getAccount(web3).then((user) => {
      dispatch(update(user.account, user.etherbase, user.type));
    }).catch(console.log);
  }
};