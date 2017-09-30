import React, { Component } from 'react';
import DoctorProfile from './components/DoctorProfile';
import getWeb3 from './utils/getWeb3';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      web3: null,
      doctors: []
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
          })
        } else {
          medCardContract.patients.call(etherbase, (err, res) => {
            if (res[0]) {
              this.setState({
                patient: res
              })
            } else {
              console.log("no identity");
            }
          });
        }
      });
    });
  }

  render() {
    if (this.state.doctor) {
        return (
          <div className = "App">
            <DoctorProfile doctor={this.state.doctor}/>
          </div>
        );
    } else if (this.state.patient) {
        return (
          <div className = "App">
            Patient page
          </div>
        )
    } else {
        return (
          <div className = "App">
            Welcome!
            {/*
            TODO think about owner page
            */}
          </div>
      );
    }
  }
}

export default App;
