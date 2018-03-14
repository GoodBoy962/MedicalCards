import ipfsAPI from 'ipfs-api';

const ipfsConf = require('../config').ipfs;

const ipfs = ipfsAPI(ipfsConf.ipfsUrl, ipfsConf.ipfsPort);

export const getFile = path =>
  new Promise(
    resolve => {
      ipfs.files.cat(path, (e, file) => {
        resolve(file.toString('utf8'));
      });
    });

export const addFile = file =>
  new Promise(
    resolve => {
      ipfs.files.add(Buffer.from(file), (err, files) => {
        resolve(files[0].hash);
      })
    }
  );
