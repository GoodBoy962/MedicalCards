'use strict';

const web3 = require('./web3');
const owner = require('./accounts').owner;
const config = require('../config').contract;
const abi = require('../config/MedRecStorage.json');

const contract = new web3.eth.Contract(abi, config.address);
const methods = contract.methods;

function fromAccount(name, account, ...args){
  const method = methods[name](...args);
  return function(gasLimit){
    return owner.psend({
      to: config.address,
      gasLimit,
      data: method.encodeABI()
    });
  };
}

Object.assign(exports, {

  setCompany(id, name, inn, kpp, ogrn, addr, director){
    return fromOwner('setCompany',
      web3.utils.fromAscii(id),
      name,
      inn,
      kpp,
      ogrn,
      JSON.stringify(addr),
      JSON.stringify(director)
    )(1000000);
  },

  setContract(id, customer, provider, description, amount, bo){
    return fromOwner('setContract',
      web3.utils.fromAscii(id),
      web3.utils.fromAscii(customer),
      web3.utils.fromAscii(provider),
      description,
      web3.utils.toWei(''+amount),
      JSON.stringify(bo)
    )(1000000);
  }

})