const bitcore = require('bitcore-lib');
const ECIES = require('bitcore-ecies');
const CryptoJS = require('crypto-js');

export const getBitPublicKey = publicKey =>
  '04' + publicKey.substring(2);

export const decryptAssymetrically = (privateKey, publicKey, value) => {
  const cypherPrivateKey = new bitcore.PrivateKey(privateKey.substring(2));
  const cypherPublicKey = new bitcore.PublicKey(getBitPublicKey(publicKey));

  const deCypher = ECIES().privateKey(cypherPrivateKey).publicKey(cypherPublicKey);

  return deCypher.decrypt(new Buffer(value, 'hex')).toString();
};

export const encryptAssymetrically = (privateKey, publicKey, value) => {
  const cypherPrivateKey = new bitcore.PrivateKey(privateKey.substring(2));
  const cypherPublicKey = new bitcore.PublicKey(getBitPublicKey(publicKey));

  const cypher = ECIES().privateKey(cypherPrivateKey).publicKey(cypherPublicKey);
  const encrypted = cypher.encrypt(Buffer.from(value));

  return Buffer.from(encrypted).toString('hex');
};

export const encrypt = (value, key) => CryptoJS.AES.encrypt(value, key).toString();


export const decrypt = (value, key) => {
  const bytes = CryptoJS.AES.decrypt(value.toString(), key);
  return CryptoJS.enc.Utf8.stringify(bytes);
};

export const sha3 = value =>CryptoJS.SHA3(value).toString();