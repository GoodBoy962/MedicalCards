import React, { Component } from 'react';
import DoctorSearchForm from './forms/DoctorSearchForm';
import RequestsService from '../utils/RequestsService';
import ContractService from '../utils/ContractService';
import RequestList from './RequestList';

class PatientPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      patient: props.patient,
      etherbase: props.etherbase,
      requests: null
    }
  }

  componentDidMount() {
    const patientAddress = this.props.etherbase;
    const web3 = this.props.web3;
    RequestsService.getPatientRequests(patientAddress, web3).then((doctors, err) => {
      this.setState({
        requests: doctors
      });
    });
  }

  render() {
    const patient = this.state.patient;
    if (this.state.requests) {
      return (
        <div className = 'PatientPage'>
          <p>Patient page</p>
          <p>Hello {patient[0]} {patient[1]}</p>
          <DoctorSearchForm web3={this.state.web3}
                            etherbase={this.state.etherbase} />

          <RequestList requests={this.state.requests} />
        </div>
      )
    }
    return (
      <div className = 'PatientPage'>
        <p>Patient page</p>
        <p>Hello {patient[0]} {patient[1]}</p>
        <DoctorSearchForm web3={this.state.web3}
                          etherbase={this.state.etherbase} />
      </div>
    );
  }
}

export default PatientPage;
