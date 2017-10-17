import React, { Component } from 'react';
import dateFormat from 'dateformat';
import ContractService from '../../utils/ContractService';
import AddRecordForm from './AddRecordForm';
import RequestPatientPermissionForm from './RequestPatientPermissionForm';

const Patient = ({patient, available, records, web3, patientAddress}) => {
  let body = null;
  if (patient) {
    if (patient[0]) {
      if (available) {
        body =
        <div>
          <p> Patient: {patient[0]} {patient[1]} </p>
          <p> Passport: {patient[2].c[0]} </p>
          <p> Birthday: {dateFormat(new Date(patient[3].c[0]), 'dd-mm-yyyy')} </p>
          <div>
            <ul>
              {records.map((record, index) => {
                return <li key={index}> {record[1]} from {record[0]}</li>;
              })}
            </ul>
          </div>
          <AddRecordForm patientAddress={patientAddress}
                         web3={web3} />
        </div>
          ;
      } else {
        body =
          <div>
          You are not accepted
          <RequestPatientPermissionForm patientAddress={patientAddress} />
          </div>
      }
    } else {
      body = <p> There is no such patient </p>;
    }
  }
  return (body);
}

class PatientSearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      etherbase: props.etherbase
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let address = this.refs.address.value;
    this.setState({
      patientAddress: address
    });
    let web3 = this.state.web3;
    ContractService.getPatientProfile(web3, this.state.etherbase, address)
      .then((res, err) => {
        this.setState({
          patient: res.patient,
          available: res.available,
          records: res.records
        });
    });
    e.preventDefault();
  }

  render() {
    return(
      <div className='PatientSearchForm'>
        <p>Patients search</p><br/>
        <form onSubmit={this.handleSubmit}>
          <label>
            enter patient address<br/>
            <input type='text' ref='address'/>
            </label>
          <input type='submit' value='search' />
        </form>

        <Patient patient={this.state.patient}
                 available={this.state.available}
                 records={this.state.records}
                 web3={this.state.web3}
                 patientAddress={this.state.patientAddress} />
      </div>
    );
  }
}

export default PatientSearchForm;
