import React, { Component } from 'react';
import DoctorSearchForm from './forms/DoctorSearchForm';

class PatientPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      patient: props.patient,
      etherbase: props.etherbase
    }
  }

  render() {
    let patient;
    if (this.state.patient) {
      patient = this.state.patient
    }
    return (
      <div className = 'PatientPage'>
        <p>Patient page</p>
        <p>Hello {patient[0]} {patient[1]}</p>
        <DoctorSearchForm web3={this.state.web3}
                          etherbase={this.state.etherbase} />
        {/*TODO add list of requests from doctors*/}
        </div>
    );
  }
}

export default PatientPage;
