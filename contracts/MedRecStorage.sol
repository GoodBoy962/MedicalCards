pragma solidity ^0.4.20;


import './lib/Ownable.sol';

/**
 * @title MedRecStorage
 * @dev The MedRecStorage smart-contract stores doctor and patients
 * identities, permissions and medical records
 */
contract MedRecStorage is Ownable {

    mapping (address => Doctor) public doctors;

    mapping (address => Patient) public patients;

    mapping (string => string[]) private records;

    // check if _address corresponds to any Doctor
    modifier isDoctor(address _address) {
        require(doctors[_address].accepted);
        _;
    }

    // check if _address doesn't correspond to any Doctor
    modifier isNotDoctor(address _address) {
        require(!doctors[_address].accepted);
        _;
    }

    // check if _address corresponds to any Patient
    modifier isPatient(address _address) {
        require(bytes(patients[_address].profile).length != 0);
        _;
    }

    // check if _address doesn't correspond to any Patient
    modifier isNotPatient(address _address) {
        require(bytes(patients[_address].profile).length == 0);
        _;
    }

    // This is a type for a single doctor identity
    struct Doctor {
        string profile;
        bool accepted;
        string publicKey;
    }

    // This is a type for a single patient identity
    struct Patient {
        string profile;
        string passphrase;
        string permissions;
        string publicKey;
    }

    //apply for a Patient
    function applyPatient (
        string _profile,
        string _passphrase,
        string _permissions,
        string _publicKey
    ) public isNotPatient(msg.sender) {
        patients[msg.sender] = Patient({
                profile: _profile,
                passphrase: _passphrase,
                permissions: _permissions,
                publicKey: _publicKey
        });
    }

    // apply for a Docotor rights
    function applyDoctor (
        string _profile,
        string _publicKey
    ) public isNotDoctor(msg.sender) {
        doctors[msg.sender] = Doctor({
                profile: _profile,
                accepted: false,
                publicKey: _publicKey
            });
    }

    // Approve the address to work as a Doctor in system
    function approveDoctor (
        address _address
    ) public isNotDoctor(_address) onlyOwner {
        require(bytes(doctors[_address].profile).length != 0);
        doctors[_address].accepted = true;
    }

    // add new record in medical card
    function addRecord(
        string _hash,
        string _value
    ) public isDoctor(msg.sender) {
        records[_hash].push(_value);
    }

    // get length of array with patient records
    function getRecordsLength (
        string _hash
    ) public constant returns (uint) {
        return records[_hash].length;
    }

    // get patient record by his index
    function getRecord (
        string _hash,
        uint _index
    ) public constant returns (string) {
        return records[_hash][_index];
    }

    function updatePermissions (
        string _permissions
    ) public isPatient(msg.sender) {
        patients[msg.sender].permissions = _permissions;
    }

}
