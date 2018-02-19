import {
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS
} from '../../constants/doctor/action';
import {
  encrypt,
  decryptAssymetrically
} from '../../lib/cipher';
import {
  addFile,
  getFile
} from '../../lib/ipfs';
import medCardStorage from '../../rpc/medCardStorage';

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

    const encRecord = Buffer.from(encrypt(record, passphrase));
    const hash = await addFile(encRecord);
    const encAddress = encrypt(patientAddress, passphrase);

    await medCardStorage.addRecord(encAddress, hash, privateKey);
    dispatch(update());

  };
