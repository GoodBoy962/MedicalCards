const {
  NODE_ENV = 'development',

  CONTRACT_ADDR = '0x6ab56877822fbc6c724360740bd134fb09b4ee1d',

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