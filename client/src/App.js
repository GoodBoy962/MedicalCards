import React, { Component } from 'react';

import DoctorPage from './components/DoctorPage';
import PatientPage from './components/PatientPage';
import WelcomePage from './components/WelcomePage';
import OwnerPage from './components/OwnerPage';
import store from './store';

import getWeb3 from './utils/Web3Service';
import ContractService from './utils/ContractService';

const DOCTOR = 'doctor';
const PATIENT = 'patient';
const OWNER = 'owner';

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
    this.getUser();
    });
  }

  getUser() {
    let web3 = this.state.web3;
    ContractService.getAccount(web3).then((user, err) => {
      store.dispatch({
        type: user.type,
        payload: {
          account: user.account,
          etherbase: user.etherbase
        }
      });
      this.setState({
        type: user.type
      });
    });
  }

  render() {
    let body;
    let type = this.state.type;
    if (type === DOCTOR) {
      body = <DoctorPage web3={this.state.web3} />;
    } else if (type === PATIENT) {
      body = <PatientPage web3={this.state.web3} />;
    } else if (type === OWNER) {
        body = <OwnerPage web3={this.state.web3} />;
    } else {
      if (this.state.etherbase) {
        body = <WelcomePage web3={this.state.web3} />;
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
