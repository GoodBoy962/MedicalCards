import {
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS
} from '../../constants/doctor/action';
import {
  encrypt,
  decryptAssymetrically,
  sha3
} from '../../lib/cipher';
import {
  addFile,
  getFile
} from '../../rpc/ipfs';
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
    const address = getState().patientSearch.address;

    let passphrase;
    const permissions = JSON.parse(await getFile(patient.permissions)).permissions;
    for (let i in permissions) {
      const decryptedPermission = decryptAssymetrically(privateKey, patient.publicKey, permissions[i]);
      if (decryptedPermission.startsWith(address)) {
        passphrase = decryptedPermission;
        break;
      }
    }
    const hash = await addFile(encrypt(record, passphrase));
    await medCardStorage.addRecord(sha3(passphrase), hash, privateKey);
    dispatch(update());

  };
