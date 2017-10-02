import React, { Component } from 'react';

class PatientProfile extends Component {

  render() {
    let patient;
    if (this.props.patient) {
      patient = this.props.patient;
    }
    return (
      //TODO create patient page
      <div className = "PatientProfile">
        <p>Patient page</p>
        <p> Hello {patient[0]} {patient[1]}</p>
      </div>
    )
  }

}

export default PatientProfile;
