pragma solidity ^0.4.17;

contract Owned {

    address public owner;

    function Owned() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner {
        owner = newOwner;
    }
}

contract MedCard is Owned {

    mapping (address => Doctor) public doctors;

    mapping (address => Record[]) private patientRecords;

    mapping (address => address[]) private patientsAvailableForDoctor;

    struct Doctor {
        string firstName;
        string lastName;
        uint passport;
        string workPlace;
        string category;
        bool accepted;
    }

    struct Record {
        string value;         //store full card in IPFS
        address doctorAddress;
    }

    function MedCard() {
        owner = msg.sender;
    }

    // apply for a Docotor rights
    function applyDoctor(string _firstName, string _lastName, uint _passport,
                       string _workPlace, string _category) public {
    require(!doctors[msg.sender].accepted);

    doctors[msg.sender] = Doctor({
            firstName: _firstName,
            lastName: _lastName,
            passport: _passport,
            workPlace: _workPlace,
            category: _category,
            accepted: false
        });
    }

    // approve the address to work as a Doctor in system
    function approveDoctor(address _doctorAddress) onlyOwner {
        require(!doctors[_doctorAddress].accepted);
        doctors[_doctorAddress].accepted = true;
    }

    // get doctor availability to work with patient records;
    function acceptDoctor(address _doctorAddress) public {
        require(doctors[_doctorAddress].accepted);
        patientsAvailableForDoctor[_doctorAddress].push(msg.sender);
    }

    function checkIfPatientAvailableForDoctor(address _patientAddress, address _doctorAddress) public constant returns (bool) {
        address[] memory patients = patientsAvailableForDoctor[_doctorAddress];
        bool availability = false;
        for (uint i = 0; i < patients.length; i++) {
            if (patients[i] == _patientAddress) {
                availability = true;
            }
        }
        return availability;
    }


    function addRecord(address _patientAddress, string _value) public {
        require(doctors[msg.sender].accepted);
        require(checkIfPatientAvailableForDoctor(_patientAddress, msg.sender));

        patientRecords[_patientAddress].push(Record({
            value: _value,
            doctorAddress: msg.sender
        }));
    }

    function getPatientRecordsLength(address _patientAddress) public constant returns (uint) {
        require(doctors[msg.sender].accepted);
        require(checkIfPatientAvailableForDoctor(_patientAddress, msg.sender));

        return patientRecords[_patientAddress].length;
    }

    function getPatientRecord(address _patientAddress, uint _recordIndex) public constant returns (address, string) {
        require(doctors[msg.sender].accepted);
        require(checkIfPatientAvailableForDoctor(_patientAddress, msg.sender));

        Record memory record = patientRecords[_patientAddress][_recordIndex];
        return (record.doctorAddress, record.value);
    }
}
