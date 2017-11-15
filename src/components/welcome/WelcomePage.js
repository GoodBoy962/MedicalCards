import React from 'react';
import PatientRegistrationForm from './PatientRegistrationForm';
import DoctorRegistrationForm from './DoctorRegistrationForm';

class WelcomePage extends React.Component {

  render() {
    return (
      <div className='WelcomePage'>
        <h3>Добро пожаловать!</h3>
        <h4>Регистрация пациента</h4>
        <PatientRegistrationForm/>
        <h4>Регистрация врача</h4>
        <DoctorRegistrationForm/>
      </div>
    );
  }

}

export default WelcomePage;
