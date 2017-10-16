import React, { Component } from 'react';
import ContractService from '../../utils/ContractService';

const Doctor = ({doctor, accepted}) => {
  let body = null;
  if (doctor) {
    if (doctor[0]) {
      body = doctor[0] + " " + doctor[1];
      if (accepted) {
        body += ' and he can add records';
      } else {
        body += ' and he can\'t add records; approve him to worh with toyr medical records';
        // body += "<input type='button' value='approve' onclick={this.approveDoctor}/>";
        //TODO add button to approve doctor
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
    this.approveDoctor = this.approveDoctor.bind(this);
  }

  approveDoctor(e) {
    console.log('approving...');
    e.preventDefault();
  }

  handleSubmit(e) {
    let doctorAddress = this.refs.address.value;
    let patientAddress = this.state.etherbase;
    let web3 = this.state.web3;
    ContractService.getDoctorProfile(web3, patientAddress, doctorAddress)
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

      <Doctor doctor={this.state.doctor} accepted={this.state.accepted} />
      </div>
    );
  }
}

export default DoctorSearchForm;
