import {
  APPROVE_DOCTOR_SUCCESS,
  APPROVE_DOCTOR_REQUEST
} from '../../constants/patient/action';
import medCardStorage from '../../rpc/medCardStorage';
import {
  encryptAssymetrically,
  decryptAssymetrically
} from '../../lib/cipher';

const update =
  () =>
    ({
      type: APPROVE_DOCTOR_SUCCESS
    });

export const approve = doctorPublicKey =>
  async function (dispatch, getState) {

    dispatch({
      type: APPROVE_DOCTOR_REQUEST
    });

    const ipfs = getState().ipfs.instance;
    const patient = getState().account.account;
    const privateKey = getState().account.privateKey;
    const publicKey = getState().account.publicKey;

    console.log(patient);
    if (!!patient.permissions) {
      await ipfs.files.cat(patient.permissions, (e, file) => {
        const chunks = [];
        file.on('data', chunks.push.bind(chunks));
        file.on('end', async function () {
          let permissions = await JSON.parse(Buffer.concat(chunks).toString()).permissions;
          const passphrase = decryptAssymetrically(privateKey, publicKey, patient.passphrase);
          permissions.push(encryptAssymetrically(privateKey, doctorPublicKey, passphrase));

          const perms = JSON.stringify({permissions});
          const files = await ipfs.files.add(Buffer.from(perms));
          const hash = files[0].hash;
          console.log(privateKey);
          console.log(hash);
          await medCardStorage.updatePermissions(hash, privateKey);
          dispatch(update());
        });
      });
    } else {
      let permissions = [];
      const passphrase = decryptAssymetrically(privateKey, publicKey, patient.passphrase);
      permissions.push(encryptAssymetrically(privateKey, doctorPublicKey, passphrase));

      const perms = JSON.stringify({permissions});
      const files = await ipfs.files.add(Buffer.from(perms));
      const hash = files[0].hash;
      console.log(privateKey);
      console.log(hash);
      await medCardStorage.updatePermissions(hash, privateKey);
      dispatch(update());
    }

  };