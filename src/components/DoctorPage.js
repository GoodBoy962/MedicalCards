import React, { Component } from 'react';
import PatientSearchForm from './forms/PatientSearchForm'

class DoctorPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      doctor: props.doctor,
      contract: props.contract,
      etherbase: props.etherbase
    };
  }

  render() {
    let doctor = this.state.doctor;
    return (
      <div className = "DoctorPage">
        <p>Doctor page</p>
        <p>Hello {doctor[0]} {doctor[1]}</p>
        <PatientSearchForm web3={this.state.web3}
                           etherbase={this.state.etherbase} />
      </div>
    )
  }

}

export default DoctorPage;
