import {
  REGISTER_PATIENT_SUCCESS,
  REGISTER_PATIENT_REQUEST
} from '../../constants/welcome/actions';
import medCardStorage from '../../rpc/medCardStorage';
import {
  encrypt,
  encryptAssymetrically
} from '../../lib/cipher';
import {
  addFile
} from '../../lib/ipfs';

const crypto = require('crypto');

const update = () => ({
  type: REGISTER_PATIENT_SUCCESS
});

export const register = (name, surname, passport, birthday) =>
  async (dispatch, getState) => {

    dispatch({
      type: REGISTER_PATIENT_REQUEST
    });

    const privateKey = getState().account.privateKey;
    const publicKey = getState().account.publicKey;
    const address = getState().account.address;

    const passphrase = generatePassphrase(address);
    const encPassphrase = encryptAssymetrically(privateKey, publicKey, passphrase);

    const profile = JSON.stringify({
      name,
      surname,
      passport,
      birthday
    });

    const encProfileHash = await addFile(encrypt(profile, passphrase));

    await medCardStorage.applyPatient(encProfileHash, encPassphrase, '', privateKey);
    dispatch(update());

  };

const generatePassphrase = (address) =>
  address + crypto.randomBytes(64).toString('hex');
