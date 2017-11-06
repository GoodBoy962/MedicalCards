import React, { Component } from 'react';

import DoctorSearchForm from './forms/DoctorSearchForm';
import RequestsService from '../utils/RequestsService';
import ContractService from '../utils/ContractService';
import RequestList from './RequestList';
import store from '../store';

class PatientPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      requests: null
    }
  }

  componentDidMount() {
    const patientAddress = store.getState().user.etherbase;
    const web3 = this.props.web3;
    RequestsService.getPatientRequests(patientAddress, web3).then((doctors, err) => {
      this.setState({
        requests: doctors
      });
    });
  }

  render() {
    const state = store.getState();
    const patient = state.user.account;
    const etherbase = state.user.etherbase;
    if (this.state.requests) {
      return (
        <div className = 'PatientPage'>
          <p>Patient page</p>
          <p>Hello {patient[0]} {patient[1]}</p>
          <DoctorSearchForm web3={this.state.web3}
                            etherbase={etherbase} />

          <RequestList web3={this.state.web3} requests={this.state.requests} />
        </div>
      )
    }
    return (
      <div className = 'PatientPage'>
        <p>Patient page</p>
        <p>Hello {patient[0]} {patient[1]}</p>
        <DoctorSearchForm web3={this.state.web3}
                          etherbase={etherbase} />
      </div>
    );
  }
}

export default PatientPage;
