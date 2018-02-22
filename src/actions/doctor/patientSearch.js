import {
  FIND_PATIENT_REQUEST,
  FIND_PATIENT_SUCCESS
} from '../../constants/doctor/action';
import medCardStorage from '../../rpc/medCardStorage';
import {
  decrypt,
  decryptAssymetrically,
  sha3
} from '../../lib/cipher';
import {
  getFile
} from '../../lib/ipfs';

const update = (address, profile, patient, available, records) => ({
  type: FIND_PATIENT_SUCCESS,
  address,
  profile,
  patient,
  available,
  records
});

export const find = address =>
  async (dispatch, getState) => {

    dispatch({
      type: FIND_PATIENT_REQUEST
    });

    const privateKey = getState().account.privateKey;

    const patient = await medCardStorage.getPatient(address);

    if (!!patient.permissions) {
      const permissions = JSON.parse(await getFile(patient.permissions)).permissions;
      let available = false, passphrase, records = [], profile;
      for (let i in permissions) {
        const decryptedPermission = decryptAssymetrically(privateKey, patient.publicKey, permissions[i]);
        if (decryptedPermission.startsWith(address)) {
          available = true;
          passphrase = decryptedPermission;
          break;
        }
      }
      if (available) {
        profile = JSON.parse(decrypt(await getFile(patient.profile), passphrase));
        const recs = await medCardStorage.getRecords(sha3(passphrase));
        if (recs) {
          for (let i in recs) {
            const record = decrypt(await getFile(await recs[i]), passphrase);
            records.push(record);
          }
        }
      }
      dispatch(update(address, profile, patient, available, records))

    } else {
      dispatch(update(address, null, patient, false, null));
    }

  };
