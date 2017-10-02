import React, { Component } from 'react';
import PatientSearchForm from './forms/PatientSearchForm'

class DoctorPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patientSearchAddress: '0x0',
      doctor: props.doctor,
      contract: props.contract
    };
  }

  render() {
    let doctor = this.state.doctor;
    return (
      <div className = "DoctorPage">
        <p>Doctor page</p>
        <p>Hello {doctor[0]} {doctor[1]}</p>
        <PatientSearchForm contract={this.state.contract}/>
      </div>
    )
  }

}

export default DoctorPage;
