import React, { Component } from 'react';

class DoctorProfile extends Component {

  render() {
    let doctor;
    if (this.props.doctor) {
      doctor = this.props.doctor;
    }
    return (
      //TODO create doctor page
      <div className = "DoctorProfile">
        <p> Hello {doctor[0]} {doctor[1]}</p>
      </div>
    )
  }

}

export default DoctorProfile;
