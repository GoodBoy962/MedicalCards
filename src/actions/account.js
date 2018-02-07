import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS
} from '../constants/actions';
import medCadStorage from '../rpc/medCardStorage';

const update = (account, address, accountType, privateKey, publicKey) => ({
  type: GET_ACCOUNT_SUCCESS,
  account,
  address,
  accountType,
  privateKey,
  publicKey
});

export const load = file =>

  async function (dispatch) {

    dispatch({
      type: GET_ACCOUNT_REQUEST
    });

    const privateKey = JSON.parse(file).pkey;

    const user = await medCadStorage.getAccount(privateKey);
    if (user) {
      console.log(user);
      dispatch(update(user.account, user.etherbase, user.type, privateKey, user.publicKey));
    } else {
      dispatch(update(null, null, null, privateKey, user.publicKey));
    }
  };