import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS
} from '../constants/actions';
import medCadStorage from '../rpc/medCardStorage';

const CryptoJS = require('crypto-js');
const bitcore = require('bitcore-lib');
const ECIES = require('bitcore-ecies');

const update = (account, profile, address, accountType, privateKey, publicKey) => ({
  type: GET_ACCOUNT_SUCCESS,
  account,
  profile,
  address,
  accountType,
  privateKey,
  publicKey
});

export const load = file =>

  async function (dispatch, getState) {

    dispatch({
      type: GET_ACCOUNT_REQUEST
    });

    const privateKey = JSON.parse(file).pkey;
    const ipfs = getState().ipfs.instance;

    const user = await medCadStorage.getAccount(privateKey);
    if (user) {

      if (user.type === 'doctor') {
        const hash = user.account.profile;
        await ipfs.files.cat(hash, (e, file) => {
          const chunks = [];
          file.on('data', chunks.push.bind(chunks));
          file.on('end', async function () {
            const profile = await JSON.parse(Buffer.concat(chunks).toString());
            dispatch(update(user.account, profile, user.etherbase, user.type, privateKey, user.publicKey));
          });
        })
      }

      if (user.type === 'patient') {
        const hash = user.account.profile;
        await ipfs.files.cat(hash, (e, file) => {
          const chunks = [];
          file.on('data', chunks.push.bind(chunks));
          file.on('end', async function () {
            const passphrase = decrypt(privateKey, user.publicKey, user.account.passphrases);
            const value = Buffer.concat(chunks).toString();
            const bytes = CryptoJS.AES.decrypt(value.toString(), passphrase);
            console.log(bytes);
            const encProfile = CryptoJS.enc.Utf8.stringify(bytes);
            const profile = await JSON.parse(encProfile.toString());
            console.log(profile);
            //TODO decrypt profile
            dispatch(update(user.account, profile, user.etherbase, user.type, privateKey, user.publicKey));
          });
        })
      }

      if (user.type === 'new') {
        dispatch(update(user.account, null, user.etherbase, user.type, privateKey, user.publicKey));
      }
    } else {
      dispatch(update(null, null, null, null, privateKey, user.publicKey));
    }
  };

const getBitPublicKey =
  publicKey =>
    '04' + publicKey.substring(2);

const decrypt =
  (privateKey, publicKey, enc) => {

    const passphrase = new Buffer(enc, 'hex');

    const cypherPrivateKey = new bitcore.PrivateKey(privateKey.substring(2));
    const cypherPublicKey = new bitcore.PublicKey(getBitPublicKey(publicKey));

    // Decrypt data
    const deCypher = ECIES().privateKey(cypherPrivateKey).publicKey(cypherPublicKey);

    return deCypher.decrypt(passphrase).toString('hex');

  };