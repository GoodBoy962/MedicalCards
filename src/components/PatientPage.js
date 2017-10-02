import React, { Component } from 'react';

class PatientPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patient: props.patient,
      contract: props.contract
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
      </div>
    )
  }
}

export default PatientPage;
