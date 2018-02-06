'use strict';

const {
  NODE_ENV = 'development',

  CONTRACT_ADDR = '',

  ETHEREUM_RPC = '',

  IPFS_URL = '',
  IPFS_PORT = ''

} = process.env;

module.exports = {
  env: NODE_ENV,

  contract: {
    address: CONTRACT_ADDR
  },

  rpc: {
    ethereum: ETHEREUM_RPC
  },

  ipfs: {
    ipfsUrl: IPFS_URL,
    ipfsPort: IPFS_PORT
  }

};