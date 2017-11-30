import Web3 from 'web3';

import { INFURA_ROPSTEN } from '../properties/properties';
const contract = require('../properties/MedCardRaw.json');

const web3 = new Web3(INFURA_ROPSTEN);
const medCardContract = new web3.eth.Contract(contract.abi, contract.address);

const initialState = {
  // instance: new Web3(window.web3.currentProvider) metamask
  instance: web3,
  contract: medCardContract

};

export default function (state = initialState) {
  return state;
}