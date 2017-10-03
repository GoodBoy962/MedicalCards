import React, { Component } from 'react';
import DoctorPage from './components/DoctorPage';
import PatientPage from './components/PatientPage';
import WelcomePage from './components/WelcomePage';
import getWeb3 from './utils/getWeb3';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      web3: null,
    }
  }

  getWeb3() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      });
      this.instantiateContract();
    });
  }

  componentWillMount() {
    this.getWeb3();
  }

  instantiateContract() {
    const contract = require('./build/contracts/MedCardRaw.json');
    const medCardContract = this.state.web3.eth.contract(contract.abi).at(contract.address);
    this.setState({
      contract: medCardContract
    });
    this.state.web3.eth.getAccounts((error, accounts) => {
      const etherbase = accounts[0];
      this.setState({
        etherbase: etherbase
      });
      medCardContract.doctors.call(etherbase, (err, res) => {
        if (res[0]) {
          this.setState({
            doctor: res
          });
        } else {
          medCardContract.patients.call(etherbase, (err, res) => {
            if (res[0]) {
              this.setState({
                patient: res
              });
            } else {
              medCardContract.owner.call((err, res) => {
                this.setState({
                  owner: res
                });
              })
              if (this.state.owner === etherbase) {
                console.log('This is the contract stakeholder');
              } else {
                console.log('no identity');
              }
            }
          });
        }
      });
    });
  }

  render() {
    let body;
    if (this.state.doctor) {
        body = <DoctorPage doctor={this.state.doctor} contract={this.state.contract} />;
    } else if (this.state.patient) {
        body = <PatientPage patient={this.state.patient} contract={this.state.contract}
                            etherbase={this.state.etherbase} />;
    } else {
        if (this.state.owner) {
          body = <WelcomePage contract={this.state.contract} />;
        }
    }
    return(
      <div className = 'App'>
        {body}
      </div>
    );
  }
}

export default App;
