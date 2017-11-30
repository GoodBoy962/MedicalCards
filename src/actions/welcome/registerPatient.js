import ContractService from '../../utils/ContractService';
import {
  REGISTER_PATIENT_SUCCESS,
  REGISTER_PATIENT_REQUEST
} from '../../constants/welcome/actions';

const crypto = require('crypto');
const bitcore = require('bitcore-lib');
const ECIES = require('bitcore-ecies');

const update =
  () =>
    ({
      type: REGISTER_PATIENT_SUCCESS
    });

export const register =
  (name, surname, passport, birthday) =>
    (dispatch, getState) => {

      dispatch({
        type: REGISTER_PATIENT_REQUEST
      });

      const web3 = getState().web3.instance;
      const privateKey = getState().account.privateKey;
      const publicKey = getState().account.publicKey;
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const contract = getState().web3.contract;

      const passphrase = generatePassphrase();
      console.log(passphrase);
      const encPassphrase = encryptedPassphrase(privateKey, publicKey, passphrase);

      ContractService
        .registerPatient(web3, account, contract, name, surname, passport, birthday, publicKey, encPassphrase)
        .then(
          res =>
            dispatch(update())
        )
        .catch(console.log);

    };

//TODO move in utils
const getBitPublicKey =
  publicKey =>
    '04' + publicKey.substring(2);

const generatePassphrase =
  () =>
    crypto.randomBytes(64).toString('hex');

const encryptedPassphrase =
  (privateKey, publicKey, passphrase) => {

    const cypherPrivateKey = new bitcore.PrivateKey(privateKey.substring(2));
    const cypherPublicKey = new bitcore.PublicKey(getBitPublicKey(publicKey));

    const cypher = ECIES().privateKey(cypherPrivateKey).publicKey(cypherPublicKey);
    const encrypted = cypher.encrypt(Buffer.from(passphrase));

    return Buffer.from(encrypted).toString('hex');
  };