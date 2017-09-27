import React, { Component } from 'react';

class DoctorProfile extends Component {
  
  render() {
    let doctor;
    if (this.props.doctor) {
      doctor = this.props.doctor;
    }
    return (
      <div className = "DoctorProfile">
        <p>{doctor.surname}</p>
      </div>
    )
  }

}

export default DoctorProfile;
