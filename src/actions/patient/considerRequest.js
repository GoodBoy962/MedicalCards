import {
  CONSIDER_REQUEST,
  CONSIDER_SUCCESS
} from '../../constants/patient/action';
import ContractService from '../../utils/ContractService';

const bitcore = require('bitcore-lib');
const ECIES = require('bitcore-ecies');

const update =
  () =>
    ({
      type: CONSIDER_SUCCESS
    });

export const consider =
  (index, doctorAddress, decision) =>
    (dispatch, getState) => {

      dispatch({
        type: CONSIDER_REQUEST
      });

      const web3 = getState().web3.instance;
      const privateKey = getState().account.privateKey;
      const publicKey = getState().account.publicKey;
      const passphrase = getState().account.account.passphrase;
      const contract = getState().web3.contract;
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);

      ContractService.getDoctor(web3, contract, doctorAddress)
        .then(
          doctor => {
            const doctorPublicKey = doctor.publicKey;

            const patientPassphrase = decryptPassphrase(privateKey, publicKey, passphrase);
            const doctorPassphrase = encryptPassphrase(privateKey, doctorPublicKey, patientPassphrase);

            ContractService.considerRequest(web3, account, contract, index, decision, doctorPassphrase)
              .then(
                (res) => {
                  console.log(res);
                  dispatch(update())
                }
              )
              .catch(console.log);
          }
        ).catch(console.log);

    };

//TODO move in utils
const getBitPublicKey =
  publicKey =>
    '04' + publicKey.substring(2);

const decryptPassphrase =
  (privateKey, publicKey, encPassphrase) => {

    const passphrase = new Buffer(encPassphrase, 'hex');

    const cypherPrivateKey = new bitcore.PrivateKey(privateKey.substring(2));
    const cypherPublicKey = new bitcore.PublicKey(getBitPublicKey(publicKey));

    // Decrypt data
    const deCypher = ECIES().privateKey(cypherPrivateKey).publicKey(cypherPublicKey);

    return deCypher.decrypt(passphrase).toString('hex');

  };

const encryptPassphrase =
  (privateKey, publicKey, passphrase) => {

    const cypherPrivateKey = new bitcore.PrivateKey(privateKey.substring(2));
    const cypherPublicKey = new bitcore.PublicKey(getBitPublicKey(publicKey));

    // Encrypt data
    const cypher = ECIES().privateKey(cypherPrivateKey).publicKey(cypherPublicKey);
    const encrypted = cypher.encrypt(Buffer.from(passphrase));

    return Buffer.from(encrypted).toString('hex');
  };