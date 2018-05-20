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

    /**
     * @dev Throws if _address doesn't corresponds to any Doctor
     * @param _address
     */
    modifier isDoctor(address _address) {
        require(doctors[_address].accepted);
        _;
    }

    /**
     * @dev Throws if _address corresponds to any Doctor
     * @param _address
     */
    modifier isNotDoctor(address _address) {
        require(!doctors[_address].accepted);
        _;
    }

    /**
     * @dev Throws if _address doesn't corresponds to any Patient
     * @param _address
     */
    modifier isPatient(address _address) {
        require(bytes(patients[_address].profile).length != 0);
        _;
    }

    /**
     * @dev Throws if _address corresponds to any Patient
     * @param _address
     */
    modifier isNotPatient(address _address) {
        require(bytes(patients[_address].profile).length == 0);
        _;
    }

    /**
     * @dev This is a type for a single doctor identity
     */
    struct Doctor {
        string profile;
        bool accepted;
        string publicKey;
    }

    /**
     * @dev This is a type for a single doctor identity
     */
    struct Patient {
        string profile;
        string passphrase;
        string permissions;
        string publicKey;
    }

    /**
     * @dev Creates new patient identity
     * @param _profile hash for the IPFS file with encrypted profile data
     * @param _passphrase encrypted passphrase
     * @param _permissions hash for the IPFS file with list of encrypted passphrases for doctors
     * @param _publicKey ethereum public key
     */
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

    /**
     * @dev Creates new doctor identity
     * @param _profile hash for the IPFS file with profile data
     * @param _publicKey ethereum public key
     */
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

    /**
     * @dev Approves doctor identity
     * @param _address doctor's address to be approved
     */
    function approveDoctor (
        address _address
    ) public isNotDoctor(_address) onlyOwner {
        require(bytes(doctors[_address].profile).length != 0);
        doctors[_address].accepted = true;
    }

    /**
     * @dev Adds new record's hash
     * @param _hash sha3 hash of the patient passphrase
     * @param _value hash for the IPFS encrypted file
     */
    function addRecord(
        string _hash,
        string _value
    ) public isDoctor(msg.sender) {
        records[_hash].push(_value);
    }

    /**
     * @dev Get length of array with patient records
     * @param _hash sha3 hash of the patient passphrase
     */
    function getRecordsLength (
        string _hash
    ) public constant returns (uint) {
        return records[_hash].length;
    }

    /**
     * @dev Get patient record by his index
     * @param _hash sha3 hash of the patient passphrase
     * @param _index index of records hash in array
     */
    function getRecord (
        string _hash,
        uint _index
    ) public constant returns (string) {
        return records[_hash][_index];
    }

    /**
     * @dev Updates hash of the permissions IPFS file
     * @param _permissions new IPFS hash
     */
    function updatePermissions (
        string _permissions
    ) public isPatient(msg.sender) {
        patients[msg.sender].permissions = _permissions;
    }

}
