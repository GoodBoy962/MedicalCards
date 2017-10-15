import React, { Component } from 'react';

class PatientProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patient: props.patient,
      available: props.available
    }
  }

  render() {
    let body;
    const patient = this.state.patient;
    const available = this.state.available;
    if (patient[0]) {
      if (available) {
        body = <p> add record </p>;
      } else {
        body = '. You are not accepted';
        //TODO add buttons to view records
      }
    } else {
      body = <p> There is no such patient </p>;
    }
    return (body);
  }

}

export default PatientProfile;
