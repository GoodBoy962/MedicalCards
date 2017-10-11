import React, { Component } from 'react';

const Doctor = ({doctor, accepted}) => {
  let body = null;
  if (doctor) {
    if (doctor[0]) {
      body = doctor[0] + " " + doctor[1];
      if (accepted) {
        body += ' and he can add records';
      } else {
        body += ' and he can\'t add records; approve him to add them';
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
      contract: props.contract,
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
    let contract = this.state.contract;
    contract.doctors.call(this.refs.address.value, (err, res) => {
      this.setState({
        doctor: res
      });
    });
    if (this.state.doctor) {
      contract.checkIfPatientAvailableForDoctor.call(
        this.state.etherbase, this.refs.address.value,
        {from: this.state.etherbase},
        (err, res) => {}
      );
      contract.checkIfPatientAvailableForDoctor(
        this.state.etherbase, this.refs.address.value,
        {from: this.state.etherbase},
        (err, res) => {
          this.setState({
            accepted: res
          });
        }
      );
    }
    e.preventDefault();
  }

  render() {
    return(
      <div className='DoctorSearchForm'>
      <p>Doctors search</p><br/>
      <form onSubmit={this.handleSubmit}>
        <label>
          enter doctor address<br/>
          <input type='text' ref='address'/>
        </label>
        <input type='submit' value='search' />
      </form>

      <Doctor doctor={this.state.doctor} accepted={this.state.accepted} />
      </div>
    );
  }
}

export default DoctorSearchForm;
