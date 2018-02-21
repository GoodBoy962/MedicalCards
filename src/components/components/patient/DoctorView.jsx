import React from 'react';

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
            <p>Доктор: { doctor.name } { doctor.surname }</p>
            <p>Учреждение: { doctor.medClinic }</p>
            <p>Специальность: { doctor.category }</p>
            <p>Имеет доступ</p>
          </div>
        )
      }
      return (
        <div>
          <p>Доктор: { doctor.name } { doctor.surname }</p>
          <p>Учреждение: { doctor.medClinic }</p>
          <p>Специальность: { doctor.category }</p>
          <p>Не может просматривать ваши записи</p>
          <input type='button' value='Дать доступ' onClick={ this.handleApprove }/>
        </div>
      )

    }
    if (doctorProfile.doctorAddress) {
      return (
        <div>Нет такого врача</div>
      )
    } return null;
  }
}