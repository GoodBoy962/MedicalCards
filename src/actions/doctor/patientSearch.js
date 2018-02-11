import {
  FIND_PATIENT_REQUEST,
  FIND_PATIENT_SUCCESS
} from '../../constants/doctor/action';
import medCardStorage from '../../rpc/medCardStorage';

const update = (patientAddress, patient, available, records) => ({
  type: FIND_PATIENT_SUCCESS,
  patientAddress,
  patient,
  available,
  records
});

export const find = patientAddress =>
  async function (dispatch, getState) {

    dispatch({
      type: FIND_PATIENT_REQUEST
    });

    const privateKey = getState().account.privateKey;
    const ipfs = getState().ipfs.instance;


    //TODO
    //1)get patient profile
    //2)check if have permissions
    //3)if have -> get records

    // ContractService.getPatientProfile(web3, account, contract, doctorAddress, patientAddress)
    //   .then(patientProfile => {
    //     let promises = [];
    //     if (patientProfile.records) {
    //       for (let i = 0; i < patientProfile.records.length; i++) {
    //         promises.push(
    //           getValue(ipfs, patientProfile.records[i], web3, account, contract, patientAddress, patientProfile.patient.publicKey)
    //         );
    //       }
    //     }
    //     Promise.all(promises)
    //       .then(records => {
    //         setTimeout(() => dispatch(
    //           update(patientAddress, patientProfile.patient, patientProfile.available, records)), 1000)
    //       })
    //   })
    //   .catch(console.log);

  };

const getValue = (ipfs, hash, web3, account, contract, patientAddress, patientPublicKey) =>
  new Promise((resolve, reject) => {

    console.log(hash);

    ipfs.files.cat(hash, (e, file) => {
      const chunks = [];

      file.on('data', chunks.push.bind(chunks));

      file.on('end', () => {
        const value = Buffer.concat(chunks).toString();
        console.log(value);
        // ContractService
        //   .getPatientPassphrase(web3, account, contract, patientAddress)
        //   .then(
        //     encPassphrase => {
        //       const passphrase = decryptPassphrase(account.privateKey, patientPublicKey, encPassphrase);
        //       console.log(passphrase);
        //
        //       //TODO add doctorAddress inside the record
        //       // record.doctorAddress = account.address;
        //       const bytes = CryptoJS.AES.decrypt(value.toString(), passphrase);
        //       console.log(bytes);
        //       const record = CryptoJS.enc.Utf8.stringify(bytes);
        //       console.log(record);
        //       resolve(record);
        //     })
      });
    })
  });
