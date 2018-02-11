import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS
} from '../constants/actions';
import medCadStorage from '../rpc/medCardStorage';
import {
  decryptAssymetrically,
  decrypt
} from '../lib/cipher';

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

  async function (dispatch, getState) {

    dispatch({
      type: GET_ACCOUNT_REQUEST
    });

    const privateKey = JSON.parse(file).pkey;
    const ipfs = getState().ipfs.instance;

    const user = await medCadStorage.getAccount(privateKey);
    if (user) {

      if (user.type === 'doctor') {
        const hash = user.account.profile;
        await ipfs.files.cat(hash, (e, file) => {
          const chunks = [];
          file.on('data', chunks.push.bind(chunks));
          file.on('end', async function () {
            const profile = await JSON.parse(Buffer.concat(chunks).toString());
            dispatch(update(user.account, profile, user.etherbase, user.type, privateKey, user.publicKey));
          });
        })
      }

      if (user.type === 'patient') {
        const hash = user.account.profile;
        await ipfs.files.cat(hash, (e, file) => {
          const chunks = [];
          file.on('data', chunks.push.bind(chunks));
          file.on('end', async function () {
            const passphrase = decryptAssymetrically(privateKey, user.publicKey, user.account.passphrase);
            const value = Buffer.concat(chunks).toString();
            const profile = JSON.parse(decrypt(value.toString(), passphrase));
            dispatch(update(user.account, profile, user.etherbase, user.type, privateKey, user.publicKey));
          });
        })
      }

      if (user.type === 'new') {
        dispatch(update(user.account, null, user.etherbase, user.type, privateKey, user.publicKey));
      }
    } else {
      dispatch(update(null, null, null, null, privateKey, user.publicKey));
    }
  };