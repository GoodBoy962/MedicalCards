import {
  APPROVE_DOCTOR_SUCCESS,
  APPROVE_DOCTOR_REQUEST
} from '../../constants/patient/action';
import medCardStorage from '../../rpc/medCardStorage';
import {
  encryptAssymetrically,
  decryptAssymetrically
} from '../../lib/cipher';
import {
  getFile,
  addFile
} from '../../lib/ipfs';

const update = () => ({
  type: APPROVE_DOCTOR_SUCCESS
});

export const approve = doctorPublicKey =>
  async function (dispatch, getState) {

    dispatch({
      type: APPROVE_DOCTOR_REQUEST
    });

    const account = getState().account;
    const patient = account.account;
    const privateKey = account.privateKey;
    const publicKey = account.publicKey;

    let permissions = [];
    const passphrase = decryptAssymetrically(privateKey, publicKey, patient.passphrase);

    if (!!patient.permissions) {
      permissions = JSON.parse(await getFile(patient.permissions)).permissions;
    }

    permissions.push(encryptAssymetrically(privateKey, doctorPublicKey, passphrase));
    const hash = await addFile(JSON.stringify({permissions}));
    await medCardStorage.updatePermissions(hash, privateKey);
    dispatch(update());

  };