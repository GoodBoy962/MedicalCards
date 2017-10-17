import React, { Component } from 'react';
import ContractService from '../../utils/ContractService';

const Doctor = ({doctor, accepted, doctorAddress, web3}) => {

  function acceptDoctor() {
    ContractService.acceptDoctorForPatient(web3, doctorAddress)
      .then((err, res) => {

      });
  }

  let body = null;
  if (doctor) {
    if (doctor[0]) {
      let doctorProfile = doctor[0] + " " + doctor[1];
      if (accepted === true) {
        body =
          <div>
            Doctor: {doctorProfile}
            <p>approved</p>
          </div>
        ;
      } else {
        body =
          <div>
            Doctor: {doctorProfile}
            <p>cant add new records</p>
            {/*TODO add different accepts for patient and contract owner*/}
            <input type='button' value='approve' onClick={acceptDoctor}/>
          </div>
        ;
      }
    } else {
      body = <p>There is no such a doctor</p>;
    }
  }
  return (body);
}

class DoctorSearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      doctor: null,
      accepted: null,
      etherbase: props.etherbase
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let doctorAddress = this.refs.address.value;
    this.setState({
      doctorAddress: doctorAddress
    })
    let patientAddress = this.state.etherbase;
    let web3 = this.state.web3;
    ContractService.getDoctorProfile(web3, doctorAddress, patientAddress)
      .then((res, err) => {
        this.setState({
          doctor: res.doctor,
          accepted: res.accepted
        });
    });
    e.preventDefault();
  }

  render() {
    return(
      <div className='DoctorSearchForm'>
        <p>Doctors search</p><br/>
        <form onSubmit={this.handleSubmit}>
          <label>enter doctor address</label>
          <input type='text' ref='address'/>
          <input type='submit' value='search' />
        </form>

      <Doctor doctor={this.state.doctor}
              accepted={this.state.accepted}
              doctorAddress={this.state.doctorAddress}
              web3={this.state.web3} />
      </div>
    );
  }
}

export default DoctorSearchForm;
