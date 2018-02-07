'use strict';

const {
  NODE_ENV = 'development',

  CONTRACT_ADDR = '0x4ea54724e9168cd4011374c681129f044a7379f9',

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