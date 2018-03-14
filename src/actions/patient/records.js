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
} from '../../rpc/ipfs';

const update = list => ({
  type: GET_RECORDS_SUCCESS,
  list
});

export const load = () =>
  async (dispatch, getState) => {

    dispatch({
      type: GET_RECORDS_REQUEST
    });

    const account = getState().account;
    const privateKey = account.privateKey;
    const publicKey = account.account.publicKey;
    const passphrase = decryptAssymetrically(privateKey, publicKey, account.account.passphrase);

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