import {
  GET_RECORDS_REQUEST,
  GET_RECORDS_SUCCESS
} from '../../constants/patient/action';
import medCardStorage from '../../rpc/medCardStorage';
import {
  decrypt,
  decryptAssymetrically,
  sha3
} from '../../lib/cipher';
import {
  getFile
} from '../../lib/ipfs';

const update = list => ({
  type: GET_RECORDS_SUCCESS,
  list
});

export const load = () =>
  async (dispatch, getState) => {

    dispatch({
      type: GET_RECORDS_REQUEST
    });

    const privateKey = getState().account.privateKey;
    const publicKey = getState().account.account.publicKey;
    const passphrase = decryptAssymetrically(privateKey, publicKey, getState().account.account.passphrase);

    const recs = await medCardStorage.getRecords(sha3(passphrase));
    const records = [];
    if (recs) {
      for (let i in recs) {
        console.log(i);
        const record = decrypt(await getFile(await recs[i]), passphrase);
        records.push(record);
      }
    }

    dispatch(update(records));

  };