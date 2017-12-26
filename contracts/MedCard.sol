pragma solidity ^0.4.19;

import './lib/Ownable.sol';

/* @title Smart contract for medical cards storing */
contract MedCard is Ownable {

    // address -> doctor profile
    mapping (address => Doctor) public doctors;

    // address -> patient profile
    mapping (address => Patient) public patients;

    // address -> All medical card records for that patient
    mapping (address => string[]) private patientRecords;

    // doctor address -> all available for him patient addresses
    mapping (address => mapping(address => string)) private patientsAvailableForDoctor;

    // patient address -> requests list with doctors addresses
    mapping (address => address[]) private requests;

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
        require(bytes(patients[_address].name).length != 0);
        _;
    }

    // check if _address doesn't correspond to any Patient
    modifier isNotPatient(address _address) {
        require(bytes(patients[_address].name).length == 0);
        _;
    }

    // This is a type for a single doctor identity
    struct Doctor {
        string name;
        string surname;
        uint passport;
        string workPlace;
        string category;
        bool accepted;
        string publicKey;
    }

    // This is a type for a single patient identity
    struct Patient {
        string name;
        string surname;
        uint passport;
        uint birthday;
        string publicKey;
        string passphrase;
    }

    //apply for a Patient
    function applyPatient(string _name,
    string _surname,
    uint _passport,
    uint _birthday,
    string _publicKey,
    string _passphrase) public isNotPatient(msg.sender) {
        patients[msg.sender] = Patient({
            name: _name,
            surname: _surname,
            passport: _passport,
            birthday: _birthday,
            publicKey: _publicKey,
            passphrase: _passphrase
        });
    }

    // apply for a Docotor rights
    function applyDoctor(string _name,
    string _surname,
    uint _passport,
    string _workPlace,
    string _category,
    string _publicKey) public isNotDoctor(msg.sender) {
        doctors[msg.sender] = Doctor({
            name: _name,
            surname: _surname,
            passport: _passport,
            workPlace: _workPlace,
            category: _category,
            accepted: false,
            publicKey: _publicKey
        });
    }

    // Approve the address to work as a Doctor in system
    function approveDoctor(address _doctorAddress) public isNotDoctor(_doctorAddress) onlyOwner {
        doctors[_doctorAddress].accepted = true;
    }

    function isPatientAvailableForDoctor(address _patientAddress, address _doctorAddress) public constant returns(bool) {
        string memory passphrase = patientsAvailableForDoctor[_doctorAddress][_patientAddress];
        return bytes(passphrase).length != 0;
    }

    // check if doctor can get patient records
    function getPatientPassphrase(address _patientAddress, address _doctorAddress) public constant returns (string) {
        return patientsAvailableForDoctor[_doctorAddress][_patientAddress];
    }

    // add new record in medical card
    function addRecord(address _patientAddress, string _value) public isPatient(_patientAddress) isDoctor(msg.sender) {
        require(isPatientAvailableForDoctor(_patientAddress, msg.sender));

        patientRecords[_patientAddress].push(_value);
    }

    // get length of array with patient records
    function getPatientRecordsLength(address _patientAddress) public constant returns (uint) {
        return patientRecords[_patientAddress].length;
    }

    // get patient record by his index
    function getPatientRecord(address _patientAddress, uint _index) public constant returns (string) {
        return patientRecords[_patientAddress][_index];
    }

    // request permission from patient
    function request(address _patientAddress) public isDoctor(msg.sender) {
        requests[_patientAddress].push(msg.sender);
    }

    // get patient requests length
    function getRequestsLength() public constant returns (uint) {
        return requests[msg.sender].length;
    }

    // get request by index
    function getRequest(uint _index) public constant returns (address) {
        return requests[msg.sender][_index];
    }

    // patient consider request from doctor by its index and his decision (and passphrase for the doctor to encrypt records)
    function considerRequest(uint _index, bool _decision, string _passphrase) public {
        if (_decision) {
            patientsAvailableForDoctor[requests[msg.sender][_index]][msg.sender] = _passphrase;
        }
        delete requests[msg.sender][_index];
    }

    //patient can give doctor access
    function acceptDoctor(address _doctorAddress, string _passphrase) public isDoctor(_doctorAddress) {
        patientsAvailableForDoctor[_doctorAddress][msg.sender] = _passphrase;
    }

}
