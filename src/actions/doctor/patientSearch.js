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

const update = (patientAddress, profile, patient, available, records) => ({
  type: FIND_PATIENT_SUCCESS,
  patientAddress,
  profile,
  patient,
  available,
  records
});

export const find = patientAddress =>
  async (dispatch, getState) => {

    dispatch({
      type: FIND_PATIENT_REQUEST
    });

    const privateKey = getState().account.privateKey;

    const patient = await medCardStorage.getPatient(patientAddress);

    if (!!patient.permissions) {
      const permissions = JSON.parse(await getFile(patient.permissions)).permissions;
      let available = false, passphrase, records = [], profile;
      for (let i in permissions) {
        const decryptedPermission = decryptAssymetrically(privateKey, patient.publicKey, permissions[i]);
        if (decryptedPermission.startsWith(patientAddress)) {
          available = true;
          passphrase = decryptedPermission;
          break;
        }
      }
      if (available) {
        const encProfile = await getFile(patient.profile);
        profile = JSON.parse(decrypt(encProfile, passphrase));
        const encryptedAddress = sha3(patientAddress);
        const recs = await medCardStorage.getRecords(encryptedAddress);
        if (recs) {
          for (let i in recs) {
            const record = decrypt(await getFile(await recs[i]), passphrase);
            records.push(record);
          }
        }
      }
      dispatch(update(patientAddress, profile, patient, available, records))

    } else {
      dispatch(update(patientAddress, null, patient, false, null));
    }

  };
