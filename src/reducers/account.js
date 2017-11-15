import { ReducerFactory } from '../lib/util';
import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS
} from '../constants/actions';

const DState = {
  account: null,
  address: null,
  accountType: null,
  fetching: false
};

const Actions = {

  [GET_ACCOUNT_SUCCESS]: (state, {account, address, accountType}) =>
    ({...state, account: account, address: address, accountType: accountType, fetching: false}),

  [GET_ACCOUNT_REQUEST]: state =>
    ({...state, fetching: true})
};

export default ReducerFactory(DState, Actions);