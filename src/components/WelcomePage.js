import React, { Component } from 'react';
import PatientRegistrationForm from './forms/PatientRegistrationForm';
import DoctorRegistrationForm from './forms/DoctorRegistrationForm';

class WelcomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      contract: props.contract,
      etherbase: props.etherbase,
    }
  }

  render() {
    return(
      <div className = 'WelcomePage'>
        <h3>Welcome!</h3>
        <h4>Registrate as a new patient </h4>
        <PatientRegistrationForm web3={this.state.web3} />
        <h4>Registrate as a new doctor</h4>
        <DoctorRegistrationForm web3={this.state.web3} />
      </div>
    );
  }

}

export default WelcomePage;
