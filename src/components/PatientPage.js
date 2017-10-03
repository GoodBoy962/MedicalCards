import React, { Component } from 'react';
import DoctorSearchForm from './forms/DoctorSearchForm';

class PatientPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patient: props.patient,
      contract: props.contract,
      etherbase: props.etherbase
    }
  }

  render() {
    let patient;
    if (this.state.patient) {
      patient = this.state.patient
    }
    return (
      <div className = "PatientPage">
        <p>Patient page</p>
        <p> Hello {patient[0]} {patient[1]}</p>
        <DoctorSearchForm contract={this.state.contract} etherbase={this.state.etherbase}/>
      </div>
    )
  }
}

export default PatientPage;
