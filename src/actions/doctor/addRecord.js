import {
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS
} from '../../constants/doctor/action';
import { decryptAssymetrically } from "../../lib/cipher";
import { getFile } from "../../lib/ipfs";

const update =
  () =>
    ({
      type: ADD_RECORD_SUCCESS
    });

export const add = record =>
  async (dispatch, getState) => {

    dispatch({
      type: ADD_RECORD_REQUEST
    });

    const privateKey = getState().account.privateKey;
    const patient = getState().patientSearch.patient;
    const patientAddress = getState().patientSearch.patientAddress;

    let passphrase;
    const permissions = JSON.parse(await getFile(patient.permissions)).permissions;
    for (let i in permissions) {
      const decryptedPermission = decryptAssymetrically(privateKey, patient.publicKey, permissions[i]);
      if (decryptedPermission.startsWith(patientAddress)) {
        passphrase = decryptedPermission;
        break;
      }
    }

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
