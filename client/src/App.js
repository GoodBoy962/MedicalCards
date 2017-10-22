import React, { Component } from 'react';
import DoctorPage from './components/DoctorPage';
import PatientPage from './components/PatientPage';
import WelcomePage from './components/WelcomePage';
import OwnerPage from './components/OwnerPage';
import getWeb3 from './utils/Web3Service';
import ContractService from './utils/ContractService';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      web3: null,
    }
  }

  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      });
    this.instantiateContract();
    });
  }

  instantiateContract() {
    let web3 = this.state.web3;
    ContractService.getAccount(web3).then((res, err) => {
      this.setState({
        account: res.account,
        type: res.type,
        etherbase: res.etherbase
      })
    });
  }

  render() {
    let body;
    let type = this.state.type;
    if (type === 'doctor') {
      body = <DoctorPage doctor={this.state.account}
                         etherbase={this.state.etherbase}
                         web3={this.state.web3} />;
    } else if (type === 'patient') {
      body = <PatientPage patient={this.state.account}
                          etherbase={this.state.etherbase}
                          web3={this.state.web3} />;
    } else if (type === 'owner') {
        body = <OwnerPage etherbase={this.state.etherbase}
                          web3={this.state.web3} />;
    } else {
      if (this.state.etherbase) {
        body = <WelcomePage web3={this.state.web3}
                            etherbase={this.state.etherbase} />;
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
