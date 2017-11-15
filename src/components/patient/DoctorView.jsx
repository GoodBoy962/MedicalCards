import React from 'react';
import { connect } from "react-redux";
import { approve } from "../../actions/patient/approveDoctor";

class DoctorView extends React.Component {

  handleApprove = (e) => {
    this.props.approve(this.props.doctorProfile.address);
    e.preventDefault();
  };

  render() {
    const doctorProfile = this.props.doctorProfile;
    const verified = doctorProfile.doctor.accepted;
    const doctor = doctorProfile.doctor;
    //check if doctor accepted in the system
    if (verified) {
      //check if patient accepted doctor
      if (doctorProfile.accepted) {
        return (
          <div>
            <p>Доктор: { doctor.name } { doctor.surname }</p>
            <p>Учреждение: { doctor.workPlace }</p>
            <p>Специальность: { doctor.category }</p>
            <p>Имеет доступ</p>
          </div>
        )
      } else {
        return (
          <div>
            <p>Доктор: { doctor.name } { doctor.surname }</p>
            <p>Учреждение: { doctor.workPlace }</p>
            <p>Специальность: { doctor.category }</p>
            <p>Не может просматривать ваши записи</p>
            <input type='button' value='Дать доступ' onClick={ this.handleApprove }/>
          </div>
        )
      }
    } else {
      return (<p>Нет такого врача</p>)
    }
  }
}

const mapStateToProps = state => ({
  web3: state.web3.instance
});

const mapDispatchToProps = dispatch => ({
  approve: (doctorAddress) => dispatch(approve(doctorAddress))
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorView);