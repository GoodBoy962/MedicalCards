import React, { Component } from 'react';
import AddRecord from './AddRecord';

const Patient = ({patient, accepted, contract, etherbase}) => {
  let body = null;
  if (patient) {
    if (patient[0]) {
      body = patient[0] + " " + patient[1];
      if (accepted) {
        body += ' add records';
        // form = <AddRecord contract={contract} etherbase={etherbase} patient={patient}>;
      } else {
        body += '. You are not accepted';
        //TODO add buttons to view records
      }
    } else {
      body = <p>There is no such patient</p>;
    }
  }
  return (body);
}

class PatientSearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contract: props.contract,
      patient: null,
      accepted: null,
      etherbase: props.etherbase
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let contract = this.state.contract;
    contract.patients.call(this.refs.address.value, (err, res) => {
      this.setState({
        patient: res
      });
    });
    if (this.state.patient) {
      contract.checkIfPatientAvailableForDoctor.call(
        this.refs.address.value, this.state.etherbase,
        {from: this.state.etherbase},
        (err, res) => {}
      );
      contract.checkIfPatientAvailableForDoctor(
        this.refs.address.value, this.state.etherbase,
        {from: this.state.etherbase},
        (err, res) => {
          this.setState({
            accepted: res
          });
        }
      )
    }
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

      <Patient patient={this.state.patient} accepted={this.state.accepted}
               contract={this.state.contract} etherbase={this.state.etherbase} />
      </div>
    );
  }
}

export default PatientSearchForm;
