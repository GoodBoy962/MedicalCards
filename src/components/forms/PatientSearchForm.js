import React, { Component } from 'react';
import PatientProfile from '../views/PatientProfile';
import ContractService from '../../utils/ContractService';

//TODO move to the separate component
const Patient = ({patient, available, records}) => {
  let body = null;
  if (patient) {
    if (patient[0]) {
      body = patient[0] + " " + patient[1];
      if (available === true) {
        body += ' add records';
        records.forEach((record) => {
          body += ('Doctor: ' + record[0] + ' Value: ' + record[1]);
        });
        // form = <AddRecord contract={contract} etherbase={etherbase} patient={patient}>;
      } else {
        body += '. You are not accepted';
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
      web3: props.web3,
      etherbase: props.etherbase
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let address = this.refs.address.value;
    let web3 = this.state.web3;
    ContractService.getPatientProfile(web3, this.state.etherbase, address).then((res, err) => {
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
               records={this.state.records} />
      </div>
    );
  }
}

export default PatientSearchForm;
