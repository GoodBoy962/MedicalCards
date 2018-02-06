pragma solidity ^0.4.19;


import './lib/Ownable.sol';

/**
 * @title MedRecStorage
 * @dev The MedRecStorage smart-contract stores doctor and patients
 * identities, permissions and medical records
 */
contract MedRecStorage is Ownable {

    mapping (address => Doctor) public doctors;

    mapping (address => Patient) public patients;

    mapping (address => string[]) private records;

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
        bytes32 passphrases;
    }

    //apply for a Patient
    function applyPatient (
        string _profile,
        bytes32 _passphrases
    ) public isNotPatient(msg.sender) {
        patients[msg.sender] = Patient({
        profile: _profile,
        passphrases: _passphrases
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
        address _doctorAddress
    ) public isNotDoctor(_doctorAddress) onlyOwner {
        doctors[_doctorAddress].accepted = true;
    }

    // check if doctor can get patient records
    function getPatient (
        address _address
    ) public constant returns (string, bytes32) {
        Patient memory patient = patients[_address];
        return (patient.profile, patient.passphrases);
    }

    // add new record in medical card
    function addRecord(
        address _patientAddress,
        string _value
    ) public isPatient(_patientAddress) isDoctor(msg.sender) {
        //TODO require(isPatientAvailableForDoctor(_patientAddress, msg.sender));
        records[_patientAddress].push(_value);
    }

    // get length of array with patient records
    function getRecordsLength (
        address _patientAddress
    ) public constant returns (uint) {
        return records[_patientAddress].length;
    }

    // get patient record by his index
    function getRecord (
        address _patientAddress,
        uint _index
    ) public constant returns (string) {
        return records[_patientAddress][_index];
    }

}
