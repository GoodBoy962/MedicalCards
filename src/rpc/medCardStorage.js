const web3 = require('./web3');
const utils = require('ethereumjs-util');
const address = require('../config').contract.address;
const abi = require('../config/MedRecStorage.json');

class MedCardStorage {

  constructor(contract) {
    this.contract = contract;
  }

  fromAccount(name, account, ...args) {
    const method = this.contract.methods[name](...args);
    return async function (gasLimit) {
      const tx = {
        to: address,
        gasLimit,
        data: method.encodeABI()
      };
      const {rawTransaction} = await account.signTransaction(tx);
      return await new Promise((resolve, reject) => {
        web3.eth.sendSignedTransaction(rawTransaction)
          .once('transactionHash', resolve)
          .catch(reject);
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
      etherbase: address,
      publicKey
    };
  }

  applyDoctor(profile, privateKey) {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const publicKey = utils.bufferToHex(utils.privateToPublic(privateKey));
    return this.fromAccount('applyDoctor', account,
      profile,
      publicKey
    )(1000000);
  }

  applyPatient(profile, passphrase, permissions, privateKey) {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const publicKey = utils.bufferToHex(utils.privateToPublic(privateKey));
    return this.fromAccount('applyPatient', account,
      profile,
      passphrase,
      permissions,
      publicKey
    )(1000000);
  }

  updatePermissions(permissions, privateKey) {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    return this.fromAccount('updatePermissions', account,
      permissions
    )(1000000);
  }

  addRecord(address, record, privateKey) {
    console.log(address);
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    return this.fromAccount('addRecord', account,
      address,
      record
    )(1000000);
  }

  async getRecords(address) {
    console.log(address);
    const recordsLength = await this.contract.methods.getRecordsLength(address).call();
    console.log(recordsLength);
    let records = [];
    for (let i = 0; i < recordsLength; i++) {
      console.log(i);
      records.push(await this.contract.methods.getRecord(address, i));
    }
    return records;
  }

}

const contract = new web3.eth.Contract(abi, address);
const medCardStorage = new MedCardStorage(contract);

export default medCardStorage;
