/* @title Smart contract for ownership */
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

/* @title Smart contract for medical cards storing */
contract MedCard is Owned {

    // address -> doctor profile
    mapping (address => Doctor) public doctors;

    // address -> patient profile
    mapping (address => Patient) public patients;

    // address -> All medical card records for that patient
    mapping (address => Record[]) private patientRecords;

    // doctor address -> all available for him patient addresses
    mapping (address => address[]) private patientsAvailableForDoctor;

    // This is a type for a single doctor identity
    struct Doctor {
        string name;
        string surname;
        uint passport;
        string workPlace;
        string category;
        bool accepted;
    }

    // This is a type for a simple record
    struct Record {
        string value;         //store full card in IPFS
        address doctorAddress;
    }

    // This is a type for a single patient identity
    struct Patient {
        string name;
        string surname;
        uint passport;
        uint birthday;
    }

    function MedCard() {
        owner = msg.sender;
    }

    //apply for a Patient
    function applyPatient(string _name,
                          string _surname,
                          uint _passport,
                          uint _birthday) public {
        require(patients[msg.sender].passport == 0x0);

        patients[msg.sender] = Patient({
            name: _name,
            surname: _surname,
            passport: _passport,
            birthday: _birthday
        });
    }

    // apply for a Docotor rights
    function applyDoctor(string _name,
                         string _surname,
                         uint _passport,
                         string _workPlace,
                         string _category) public {
        require(!doctors[msg.sender].accepted);

        doctors[msg.sender] = Doctor({
            name: _name,
            surname: _surname,
            passport: _passport,
            workPlace: _workPlace,
            category: _category,
            accepted: false
        });
    }

    // Approve the address to work as a Doctor in system
    function approveDoctor(address _doctorAddress) onlyOwner {
        require(!doctors[_doctorAddress].accepted);

        doctors[_doctorAddress].accepted = true;
    }

    // patient accept doctor available to work with patient records;
    function acceptDoctorForPatient(address _doctorAddress) public {
        require(doctors[_doctorAddress].accepted && patients[msg.sender].passport != 0x0);

        patientsAvailableForDoctor[_doctorAddress].push(msg.sender);
    }

    // check if doctor can get patient records
    function checkIfPatientAvailableForDoctor(address _patientAddress,
                                              address _doctorAddress) public constant returns (bool) {
        address[] memory patients = patientsAvailableForDoctor[_doctorAddress];
        bool availability = false;
        for (uint i = 0; i < patients.length; i++) {
            if (patients[i] == _patientAddress) {
                availability = true;
            }
        }
        return availability;
    }

    // add new record in medical card
    function addRecord(address _patientAddress,
                       string _value) public {
        require(patients[_patientAddress].passport != 0);
        require(doctors[msg.sender].accepted);
        require(checkIfPatientAvailableForDoctor(_patientAddress, msg.sender));

        patientRecords[_patientAddress].push(Record({
            value: _value,
            doctorAddress: msg.sender
        }));
    }

    // get length of array with patient records
    function getPatientRecordsLength(address _patientAddress) public constant returns (uint) {
        require(doctors[msg.sender].accepted);
        require(checkIfPatientAvailableForDoctor(_patientAddress, msg.sender));

        return patientRecords[_patientAddress].length;
    }

    // get patirnt record by it's index
    function getPatientRecord(address _patientAddress, uint _recordIndex) public constant returns (address, string) {
        require(doctors[msg.sender].accepted);
        require(checkIfPatientAvailableForDoctor(_patientAddress, msg.sender));

        Record memory record = patientRecords[_patientAddress][_recordIndex];
        return (record.doctorAddress, record.value);
    }
}
