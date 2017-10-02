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

        <p>Registrate as a new patient </p>
        <PatientRegistrationForm contract={this.state.contract} />

        <p>Registrate as a new doctor </p>
        <DoctorRegistrationForm contract={this.state.contract} />
      </div>
    )
  }

}

export default WelcomePage;
