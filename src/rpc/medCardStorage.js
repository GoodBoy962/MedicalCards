const web3 = require('./web3');
const utils = require('ethereumjs-util');
const acc = require('./accounts');
const address = require('../config').contract.address;
const abi = require('../config/MedRecStorage.json');

class MedCardStorage {

  constructor(contract) {
    this.contract = contract;
  }

  fromAccount(name, account, ...args) {
    const method = this.contract.methods[name](...args);
    return function (gasLimit) {
      return acc.psend({
        to: address,
        gasLimit,
        data: method.encodeABI()
      });
    };
  }

  async getDoctor(address) {
    return await this.contract.methods.doctors(address).call();
  }

  async getPatient(address) {
    return await this.contract.methods.patients(address).call();
  }

  async getOwner() {
    return await this.contract.methods.owner().call();
  }

  async getAccount(privateKey) {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const address = account.address;
    const publicKey = utils.bufferToHex(utils.privateToPublic(privateKey));
    const doctor = await this.getDoctor(address);
    if (doctor[0]) {
      return {
        type: 'doctor',
        account: doctor,
        etherbase: address,
        publicKey
      }
    }
    const patient = await this.getPatient(address);
    if (patient[0]) {
      return {
        type: 'patient',
        account: patient,
        etherbase: address,
        publicKey
      }
    }
    const owner = await this.getOwner();
    if (owner === address) {
      return {
        type: 'owner',
        account: owner,
        etherbase: address,
        publicKey
      }
    }
    return {
      type: 'new',
      account: null,
      etherbase: address
    };
  }

  applyDoctor(account, profile, publicKey) {
    return this.fromAccount('applyDoctor', account,
      profile,
      publicKey
    )(1000000);
  }

  applyPatient(account, profile, passphrase, permissions) {
    return this.fromAccount('applyPatient', account,
      profile,
      web3.utils.fromAscii(passphrase),
      permissions
    )(1000000);
  }


//TODO
//add record
//get records

}

const contract = new web3.eth.Contract(abi, address);
const medCardStorage = new MedCardStorage(contract);

export default medCardStorage;
