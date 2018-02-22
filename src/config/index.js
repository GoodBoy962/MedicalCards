require('dotenv').config();

const {
  NODE_ENV = 'development',

  REACT_APP_CONTRACT_ADDR = '',

  REACT_APP_ETHEREUM_RPC = '',

  REACT_APP_IPFS_URL = '',
  REACT_APP_IPFS_PORT = ''

} = process.env;

module.exports = {
  env: NODE_ENV,

  contract: {
    address: REACT_APP_CONTRACT_ADDR.toString('hex')
  },

  rpc: {
    ethereum: REACT_APP_ETHEREUM_RPC
  },

  ipfs: {
    ipfsUrl: REACT_APP_IPFS_URL,
    ipfsPort: REACT_APP_IPFS_PORT
  }

};