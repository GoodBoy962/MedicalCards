import React, { Component } from 'react';

const Patient = ({patient}) => {
  let body = null;
  if (patient) {
    if (patient[0]) {
      body = patient[0] + " " + patient[1];
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
      patient: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.state.contract.patients.call(this.refs.address.value, (err, res) => {
      this.setState({
        patient: res
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

      <Patient patient={this.state.patient} />
      </div>
    );
  }
}

export default PatientSearchForm;
