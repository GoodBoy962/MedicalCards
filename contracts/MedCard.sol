pragma solidity ^0.4.15;

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

  mapping (address => Record[]) public patientRecords;

  struct Doctor {
    string firstName;
    string lastName;
    uint passport;
    string workPlace;
    string category;
    bool accepted;
  }

  struct Record {
    string value;
    address doctorAddress;
  }

  function MedCard() {
    owner = msg.sender;
  }

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
}
