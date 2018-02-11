import {
  REGISTER_PATIENT_SUCCESS,
  REGISTER_PATIENT_REQUEST
} from '../../constants/welcome/actions';
import medCardStorage from '../../rpc/medCardStorage';
import {
  encrypt,
  encryptAssymetrically
} from '../../lib/cipher';

const crypto = require('crypto');

const update = () => ({
  type: REGISTER_PATIENT_SUCCESS
});

export const register = (name, surname, passport, birthday) =>
  async function (dispatch, getState) {

    dispatch({
      type: REGISTER_PATIENT_REQUEST
    });

    const privateKey = getState().account.privateKey;
    const publicKey = getState().account.publicKey;
    const address = getState().account.address;
    const ipfs = getState().ipfs.instance;

    const passphrase = generatePassphrase(address);
    const encPassphrase = encryptAssymetrically(privateKey, publicKey, passphrase);

    const profile = JSON.stringify({
      name,
      surname,
      passport,
      birthday
    });

    const encProfile = encrypt(profile, passphrase);
    const files = await ipfs.files.add(Buffer.from(encProfile));
    const encProfileHash = files[0].hash;

    await medCardStorage.applyPatient(encProfileHash, encPassphrase, '', privateKey);
    dispatch(update());

  };

const generatePassphrase = (address) =>
  address + crypto.randomBytes(64).toString('hex');
