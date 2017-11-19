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
                          uint _birthday) public isNotPatient(msg.sender) {
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
                         string _category) public isNotDoctor(msg.sender) {
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
                       string _value) public isPatient(_patientAddress) isDoctor(msg.sender) {
        require(checkIfPatientAvailableForDoctor(_patientAddress, msg.sender));

        patientRecords[_patientAddress].push(Record({
            value: _value,
            doctorAddress: msg.sender
        }));
    }

    // get length of array with patient records
    function getPatientRecordsLength(address _patientAddress) public constant returns (uint) {
        return patientRecords[_patientAddress].length;
    }

    // get patient record by his index
    function getPatientRecord(address _patientAddress, uint _recordIndex) public constant returns (address, string) {
        Record memory record = patientRecords[_patientAddress][_recordIndex];
        return (record.doctorAddress, record.value);
    }

    // request permission from patient
    function request(address _patientAddress) public isDoctor(msg.sender) {
        requests[_patientAddress].push(msg.sender);
    }

    // get patient requests length
    function getRequestsLength() public constant returns (uint) {
        return requests[msg.sender].length;
    }

    function getRequest(uint index) public constant returns (address) {
        return requests[msg.sender][index];
    }

    function considerRequest(uint index, bool decision) public {
        if (decision) {
            patientsAvailableForDoctor[requests[msg.sender][index]].push(msg.sender);
        }
        delete requests[msg.sender][index];
    }

}
