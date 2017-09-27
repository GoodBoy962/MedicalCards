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
    const medCardContract = new this.state.web3.eth.Contract(contract.abi, contract.address);
    this.setState({
      contract: medCardContract
    });
    this.state.web3.eth.getAccounts((error, accounts) => {
      const etherbase = accounts[0];
      this.setState({
        etherbase: etherbase
      });
      console.log(etherbase);
      this.state.web3.eth.getBalance(etherbase, (err, res) => {
          console.log(res);
      });
      // medCardContract.methods.applyDoctor.call(
      //   etherbase,
      //   "Alexander",
      //   "Pliskin",
      //   9216113183,
      //   "RKB",
      //   "surgery",
      //   (err, res) =>{console.log(res)
      //   });

      console.log(medCardContract.methods.doctors.call(etherbase, (err, res) => {

      }));
      medCardContract.methods.doctors.call(etherbase, (err, res) => {
          if (res) {
            console.log(res);
          } else {
            console.log("No doctors");
          }
      })
    });
  }

  render() {
    if (this.state.patient) {

    } else if (this.state.doctor) {
        return (
          <div className = "App">
            <DoctorProfile doctor={this.state.dctor}/>
          </div>
        );
    } else {
        return (
          <div className = "App">
            Nothing
          </div>
      );
    }
  }
}

export default App;
