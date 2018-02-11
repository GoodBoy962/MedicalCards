const Web3 = require('web3');
const rpc = require('../config').rpc;

const web3 = new Web3(rpc.ethereum);

module.exports = web3;