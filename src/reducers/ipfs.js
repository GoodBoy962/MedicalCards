import ipfsAPI from 'ipfs-api';
import {
  ReducerFactory
} from '../lib/util';

const ipfs = require('../config').ipfs;

const DState = {
  instance: ipfsAPI(ipfs.ipfsUrl, ipfs.ipfsPort)
};

export default ReducerFactory(DState, {});