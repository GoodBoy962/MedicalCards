import React, { Component } from 'react';
import PatientRegistrationForm from './forms/PatientRegistrationForm';
import DoctorRegistrationForm from './forms/DoctorRegistrationForm';

class WelcomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contract: props.contract
    }
  }

  render() {
    return (
      <div className = "WelcomePage">
        <h3>Welcome!</h3>

        <h4>Registrate as a new patient </h4>
        <PatientRegistrationForm contract={this.state.contract} />

        <h4>Registrate as a new doctor </h4>
        <DoctorRegistrationForm contract={this.state.contract} />
      </div>
    )
  }

}

export default WelcomePage;
