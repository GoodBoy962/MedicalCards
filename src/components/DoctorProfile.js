import React, { Component } from 'react';

class DoctorProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patientSearchAddress: '0x0',
      doctor: this.props.doctor,
      web3: this.props.web3,
      contract: this.props.contract
    };

    this.handlePatientSearchAddressChange = this.handlePatientSearchAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.state.contract.patients.call(this.state.patientSearchAddress, (err, res) => {
      if (res[0]) {
        this.setState({
          patient: res
        });
        console.log("patient is " + res);
      } else {
        console.log("no patient with such address");
      }
    });
    e.preventDefault();
  }

  handlePatientSearchAddressChange(e) {
    this.setState({
      patientSearchAddress : e.target.value
    });
    e.preventDefault();
  }

  render() {
    let doctor = this.state.doctor;
    return (
      <div className = "DoctorProfile">
        <p>Doctor page</p>
        <p>Hello {doctor[0]} {doctor[1]}</p>


        <p>Patients search</p><br/>
        { /*
          TODO move search form in the separate component
          */}
        <form className="parientSearchForm" onSubmit={this.handleSubmit}>
          <label>
            Patient address<br/>
            <input type="string" className="patientAddress"
             value={this.state.patientSearchAddress} onChange={this.handlePatientSearchAddressChange}/>
          </label>
          <input type="submit" value="search" />
        </form>
      </div>
    )
  }

}

export default DoctorProfile;
