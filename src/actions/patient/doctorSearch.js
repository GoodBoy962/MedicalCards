import {
  FIND_DOCTOR_REQUEST,
  FIND_DOCTOR_SUCCESS
} from '../../constants/patient/action';
import medCardStorage from '../../rpc/medCardStorage';
import {
  decryptAssymetrically,
  encryptAssymetrically
} from '../../lib/cipher';
import {
  getFile
} from '../../lib/ipfs';

const update = (doctorAddress, profile, doctor, accepted) => ({
  type: FIND_DOCTOR_SUCCESS,
  doctorAddress,
  profile,
  doctor,
  accepted
});

export const find = doctorAddress =>
  async function (dispatch, getState) {

    dispatch({
      type: FIND_DOCTOR_REQUEST,
      doctorAddress: doctorAddress,
      profile: null,
      doctor: null,
      accepted: null
    });

    const account = getState().account;
    const patient = account.account;
    const privateKey = account.privateKey;
    const publicKey = account.publicKey;

    const doctor = await medCardStorage.getDoctor(doctorAddress);

    if (doctor) {
      const doctorPublicKey = doctor.publicKey;
      const doctorProfile = JSON.parse(await getFile(doctor.profile));
      const passphrase = decryptAssymetrically(privateKey, publicKey, patient.passphrase);

      if (!!patient.permissions) {
        const permissions = JSON.parse(await getFile(patient.permissions)).permissions;
        const encPassphrase = encryptAssymetrically(privateKey, doctorPublicKey, passphrase);
        if (permissions.indexOf(encPassphrase) > -1) {
          dispatch(update(doctorAddress, doctorProfile, doctor, true));
        } else {
          dispatch(update(doctorAddress, doctorProfile, doctor, false));
        }
      } else {
        dispatch(update(doctorAddress, doctorProfile, doctor, false));
      }
    } else {
      dispatch(update(doctorAddress))
    }
  };
