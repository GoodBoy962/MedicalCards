import Web3 from 'web3';

import { INFURA_ROPSTEN } from '../properties/properties';
const contractRaw = require('../properties/MedRecStorage.json');

const web3 = new Web3(INFURA_ROPSTEN);
const contract = new web3.eth.Contract(contractRaw.abi, contractRaw.address);

const initialState = {
  instance: web3,
  contract
};

export default (state = initialState) => {
  return state;
}