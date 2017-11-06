import React, { Component } from 'react';

import PatientSearchForm from './forms/PatientSearchForm';
import store from '../store';

class DoctorPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3
    };
  }

  render() {
    const doctor = store.getState().user.account;
    return (
      <div className = 'DoctorPage'>
        <p>Doctor page</p>
        <p>Hello {doctor[0]} {doctor[1]}</p>
        <PatientSearchForm web3={this.state.web3} />
      </div>
    );
  }

}

export default DoctorPage;
