import ipfsAPI from 'ipfs-api';

const ipfsConf = require('../config').ipfs;

const ipfs = ipfsAPI(ipfsConf.ipfsUrl, ipfsConf.ipfsPort);

export const getFile = hash =>
  new Promise(
    resolve => {
      ipfs.files.cat(hash, (e, file) => {
        const chunks = [];
        file.on('data', chunks.push.bind(chunks));
        file.on('end', async function () {
          const value = Buffer.concat(chunks).toString();
          resolve(value);
        });
      });
    });

export const addFile = file =>
  new Promise(
    resolve => {
      ipfs.files.add(file, (err, files) => {
        resolve(files[0].hash);
      })
    }
  );