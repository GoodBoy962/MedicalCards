'use strict';

const web3 = require('./web3');
const acc = require('./accounts').acc;
const address = require('../config').contract.address;
const abi = require('../config/MedRecStorage.json');

const contract = new web3.eth.Contract(abi, address);
const methods = contract.methods;

function fromAccount(name, account, ...args){
  const method = methods[name](...args);
  return function(gasLimit){
    return acc.psend({
      to: address,
      gasLimit,
      data: method.encodeABI()
    });
  };
}

Object.assign(exports, {

  async getDoctor(address){
    return await contract.methods.doctors(address).call();
  },

  async getPatient(address){
    return await contract.methods.patients(address).call();
  },

  async getOwner(){
    return await contract.methods.owner().call();
  },

  async getAccount(account){
    const address = account.address;
    const doctor = await getDoctor(address);
    if(doctor[0]){
      return {
        type: 'doctor',
        account: doctor,
        etherbase: address
      }
    }
    const patient = await getPatient(address);
    if(patient[0]){
      return {
        type: 'patient',
        account: patient,
        etherbase: address
      }
    }
    const owner = await getOwner();
    if(owner === address){
      return {
        type: 'owner',
        account: owner,
        etherbase: address
      }
    }
    return {
      type: 'new',
      account: null,
      etherbase: address
    }
  },

  applyDoctor(account, profile, publicKey){
    return fromAccount('applyDoctor', account,
      profile,
      publicKey
    )(1000000);
  },

  applyPatient(account, profile, passphrase, permissions){
    return fromAccount('applyPatient', account,
      profile,
      web3.utils.fromAscii(passphrase),
      permissions
    )(1000000);
  }

  //TODO
  //add record
  //get records

});