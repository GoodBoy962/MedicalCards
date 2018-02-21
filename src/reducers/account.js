import { ReducerFactory } from '../lib/util';
import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS
} from '../constants/actions';

const DState = {
  account: null,
  profile: null,
  address: null,
  privateKey: null,
  publicKey: null,
  accountType: null,
  fetching: false
};

const Actions = {

  [GET_ACCOUNT_SUCCESS]: (state, {account, profile, address, accountType, privateKey, publicKey}) =>
    ({
      ...state,
      account: account,
      profile: profile,
      address: address,
      accountType: accountType,
      privateKey: privateKey,
      publicKey: publicKey,
      fetching: false
    }),

  [GET_ACCOUNT_REQUEST]: state =>
    ({...state, fetching: true})
};

export default ReducerFactory(DState, Actions);