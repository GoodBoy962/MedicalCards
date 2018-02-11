const {
  NODE_ENV = 'development',

  CONTRACT_ADDR = '0xe6ea270d23c90431b28c5eb3d3f60e7e22da7e09',

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