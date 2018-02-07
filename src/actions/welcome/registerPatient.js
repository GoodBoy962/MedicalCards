import {
  REGISTER_PATIENT_SUCCESS,
  REGISTER_PATIENT_REQUEST
} from '../../constants/welcome/actions';
import medCardStorage from '../../rpc/medCardStorage';

const crypto = require('crypto');
const bitcore = require('bitcore-lib');
const ECIES = require('bitcore-ecies');

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
    const encPassphrase = encrypt(privateKey, publicKey, passphrase);

    const profile = JSON.stringify({
      name, surname, passport, birthday
    });
    const encProfile = encrypt(privateKey, publicKey, profile);
    const files = await ipfs.files.add(Buffer.from(encProfile));
    const encProfileHash = files[0].hash;

    await medCardStorage.applyPatient(encProfileHash, encPassphrase, '', privateKey);
    dispatch(update());

  };

const getBitPublicKey = publicKey =>
    '04' + publicKey.substring(2);

const generatePassphrase = (address) =>
  address + crypto.randomBytes(64).toString('hex');

const encrypt = (privateKey, publicKey, passphrase) => {

  const cypherPrivateKey = new bitcore.PrivateKey(privateKey.substring(2));
  const cypherPublicKey = new bitcore.PublicKey(getBitPublicKey(publicKey));

  const cypher = ECIES().privateKey(cypherPrivateKey).publicKey(cypherPublicKey);
  const encrypted = cypher.encrypt(Buffer.from(passphrase));

  return Buffer.from(encrypted).toString('hex');
};