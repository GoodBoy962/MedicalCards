import {
  FIND_DOCTOR_REQUEST,
  FIND_DOCTOR_SUCCESS
} from '../../constants/patient/action';
import medCardStorage from '../../rpc/medCardStorage';
import {
  decrypt,
  decryptAssymetrically
} from '../../lib/cipher';

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

    const ipfs = getState().ipfs.instance;
    const patient = getState().account.account;
    const privateKey = getState().account.privateKey;
    const publicKey = getState().account.publicKey;

    const doctor = await medCardStorage.getDoctor(doctorAddress);
    const doctorPublicKey = await doctor.publicKey;
    const hash = doctor.profile;
    const doctorProfile = await ipfs.files.cat(hash, (e, file) => {
      const chunks = [];
      file.on('data', chunks.push.bind(chunks));
      file.on('end', async function () {
        return await JSON.parse(Buffer.concat(chunks).toString());
      });
    });

    const passphrase = decryptAssymetrically(privateKey, publicKey, patient.passphrases);

    if (!!patient.permissions) {
      await ipfs.files.cat(patient.permissions, (e, file) => {
        const chunks = [];
        file.on('data', chunks.push.bind(chunks));
        file.on('end', async function () {
          //TODO
          //1)convert to array
          //2)find if decrypt()
          Buffer.concat(chunks).toString();
          dispatch(update(doctorAddress, doctorProfile, doctor, true));
          // const passphrase = decryptAssymetrically(privateKey, publicKey, patient.passphrases);
          // return Buffer.concat(chunks).toString();
        });
      });
    } else {
      dispatch(update(doctorAddress, doctorProfile, doctor, false));
    }
  };
