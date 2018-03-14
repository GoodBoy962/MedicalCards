import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS
} from '../constants/actions';
import medCadStorage from '../rpc/medCardStorage';
import {
  decryptAssymetrically,
  decrypt
} from '../lib/cipher';
import {
  getFile
} from '../rpc/ipfs';

const update = (account, profile, address, accountType, privateKey, publicKey) => ({
  type: GET_ACCOUNT_SUCCESS,
  account,
  profile,
  address,
  accountType,
  privateKey,
  publicKey
});

export const load = file =>
  async dispatch => {

    dispatch({
      type: GET_ACCOUNT_REQUEST
    });

    const privateKey = JSON.parse(file).pkey;

    const user = await medCadStorage.getAccount(privateKey);
    if (user) {

      if (user.account) {
        let profile = await getFile(user.account.profile);
        if (user.type === 'doctor') {
          profile = JSON.parse(profile);
          dispatch(update(user.account, profile, user.etherbase, user.type, privateKey, user.publicKey));
        }

        if (user.type === 'patient') {
          const passphrase = decryptAssymetrically(privateKey, user.publicKey, user.account.passphrase);
          profile = JSON.parse(decrypt(profile, passphrase));
          dispatch(update(user.account, profile, user.etherbase, user.type, privateKey, user.publicKey));
        }
      } else {
        if (user.type === 'new') {
          dispatch(update(user.account, null, user.etherbase, user.type, privateKey, user.publicKey));
        }
      }
    } else {
      dispatch(update(null, null, null, null, privateKey, user.publicKey));
    }
  };