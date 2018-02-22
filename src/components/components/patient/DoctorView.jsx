import React from 'react';
import DoctorProfile from '../../views/DoctorProfile';

export default class DoctorView extends React.Component {

  handleApprove = (e) => {
    this.props.approve(this.props.doctorProfile.doctor.publicKey);
    e.preventDefault();
  };

  render() {
    const doctorProfile = this.props.doctorProfile;
    const doctor = doctorProfile.profile;
    if (doctor && doctorProfile.doctor.accepted) {
      if (doctorProfile.accepted) {
        return (
          <div>
            <DoctorProfile profile={doctor} address={doctorProfile.address}/>
            <p>Имеет доступ</p>
          </div>
        )
      }
      return (
        <div>
          <DoctorProfile profile={doctor} address={doctorProfile.address}/>
          <p>Не может просматривать ваши записи</p>
          <input type='button' value='Дать доступ' onClick={ this.handleApprove }/>
        </div>
      )

    }
    if (doctorProfile.address) {
      return (
        <div>Нет такого врача</div>
      )
    } return null;
  }
}