import {
  FIND_PATIENT_REQUEST,
  FIND_PATIENT_SUCCESS
} from '../../constants/doctor/action';
import ContractService from '../../utils/ContractService';

const CryptoJS = require('crypto-js');

const bitcore = require('bitcore-lib');
const ECIES = require('bitcore-ecies');

const update =
  (patientAddress, patient, available, records) =>
    ({
      type: FIND_PATIENT_SUCCESS,
      patientAddress,
      patient,
      available,
      records
    });

export const find =
  (doctorAddress, patientAddress) =>
    (dispatch, getState) => {

      dispatch({
        type: FIND_PATIENT_REQUEST
      });

      const web3 = getState().web3.instance;
      const privateKey = getState().account.privateKey;
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const contract = getState().web3.contract;
      const ipfs = getState().ipfs.instance;

      ContractService.getPatientProfile(web3, account, contract, doctorAddress, patientAddress)
        .then(patientProfile => {
          let promises = [];
          if (patientProfile.records) {
            for (let i = 0; i < patientProfile.records.length; i++) {
              promises.push(
                getValue(ipfs, patientProfile.records[i], web3, account, contract, patientAddress, patientProfile.patient.publicKey)
              );
            }
          }
          Promise.all(promises)
            .then(records => {
              setTimeout(() => dispatch(
                update(patientAddress, patientProfile.patient, patientProfile.available, records)), 1000)
            })
        })
        .catch(console.log);

    };

const getValue =
  (ipfs, hash, web3, account, contract, patientAddress, patientPublicKey) =>
    new Promise((resolve, reject) => {

      console.log(hash);

      ipfs.files.cat(hash, (e, file) => {
        const chunks = [];

        file.on('data', chunks.push.bind(chunks));

        file.on('end', () => {
          const value = Buffer.concat(chunks).toString();
          console.log(value);
          ContractService
            .getPatientPassphrase(web3, account, contract, patientAddress)
            .then(
              encPassphrase => {
                const passphrase = decryptPassphrase(account.privateKey, patientPublicKey, encPassphrase);
                console.log(passphrase);

                //TODO add doctorAddress inside the record
                // record.doctorAddress = account.address;
                const bytes = CryptoJS.AES.decrypt(value.toString(), passphrase);
                console.log(bytes);
                const record = CryptoJS.enc.Utf8.stringify(bytes);
                console.log(record);
                resolve(record);
              })
        });
      })
    });

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