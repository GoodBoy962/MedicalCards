import {
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS
} from '../../constants/doctor/action';
// import ContractService from '../../utils/ContractService';

import AES from 'crypto-js/aes';

const bitcore = require('bitcore-lib');
const ECIES = require('bitcore-ecies');

const update =
  () =>
    ({
      type: ADD_RECORD_SUCCESS
    });

export const add =
  (patientAddress, patientPublicKey, record) =>
    (dispatch, getState) => {

      dispatch({
        type: ADD_RECORD_REQUEST
      });

      const web3 = getState().web3.instance;
      const privateKey = getState().account.privateKey;
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const contract = getState().web3.contract;
      const ipfs = getState().ipfs.instance;

      // ContractService
      //   .getPatientPassphrase(web3, account, contract, patientAddress)
      //   .then(
      //     encPassphrase => {
      //       const passphrase = decryptPassphrase(privateKey, patientPublicKey, encPassphrase);
      //       console.log(passphrase);
      //       console.log(record);
      //       //TODO add doctorAddress inside the record
      //       // record.doctorAddress = account.address;
      //       const encryptedRecord = AES.encrypt(record, passphrase).toString();
      //       console.log(encryptedRecord);
      //       const encryptedRecordBuf = Buffer.from(encryptedRecord);
      //       console.log(encryptedRecordBuf);
      //
      //       ipfs.files.add(encryptedRecordBuf, (err, files) => {
      //         console.log(files[0].hash);
      //         ContractService
      //           .addRecord(web3, account, contract, patientAddress, files[0].hash)
      //           .then((err, res) => dispatch(update()))
      //           .catch(console.log);
      //       })
      //
      //     }
      //   )
      //   .catch(console.log);

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