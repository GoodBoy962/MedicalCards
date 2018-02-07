'use strict';

const {
  NODE_ENV = 'development',

  CONTRACT_ADDR = '0xa2bf6884343523306d6c03ff0a75b041b427fce5',

  ETHEREUM_RPC = 'https://ropsten.infura.io/oI5puXL7bMnaY7Dv9AzF',

  IPFS_URL = 'localhost',
  IPFS_PORT = '5001'

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