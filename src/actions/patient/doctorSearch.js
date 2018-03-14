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
} from '../../rpc/ipfs';

const update = (address, profile, doctor, accepted) => ({
  type: FIND_DOCTOR_SUCCESS,
  address,
  profile,
  doctor,
  accepted
});

export const find = address =>
  async function (dispatch, getState) {

    dispatch({
      type: FIND_DOCTOR_REQUEST,
      address,
      profile: null,
      doctor: null,
      accepted: null
    });

    const account = getState().account;
    const patient = account.account;
    const privateKey = account.privateKey;
    const publicKey = account.publicKey;

    const doctor = await medCardStorage.getDoctor(address);

    if (doctor.profile) {
      const doctorPublicKey = doctor.publicKey;
      const doctorProfile = JSON.parse(await getFile(doctor.profile));
      const passphrase = decryptAssymetrically(privateKey, publicKey, patient.passphrase);
      let accepted = false;

      if (!!patient.permissions) {
        const permissions = JSON.parse(await getFile(patient.permissions)).permissions;
        if (permissions.indexOf(encryptAssymetrically(privateKey, doctorPublicKey, passphrase)) > -1) {
          accepted = true;
        }
      }
      dispatch(update(address, doctorProfile, doctor, accepted));
    } else {
      dispatch(update(address))
    }
  };
