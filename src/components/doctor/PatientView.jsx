import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat'

import { find } from '../../actions/doctor/patientSearch';

import RequestPatientPermission from './RequestPatientPermission';
import AddRecord from './AddRecord';

class PatientView extends React.Component {

  render() {
    const patientProfile = this.props.patientProfile;
    const patient = patientProfile.patient;
    if (patient.name) {
      if (patientProfile.available) {
        return (
          <div>
            <p>Пациент: { patient.name } { patient.surname }</p>
            <p>Паспорт: { patient.passport } </p>
            <p>Дата рождения: { dateFormat(new Date(Number.parseInt(patient.birthday, 0)), 'dd-mm-yyyy') } </p>
            <div>
              <p>Записи</p>
              <ul>
                { patientProfile.records.map((record, index) => {
                  return <li key={ index }> { record.value } </li>;
                }) }
              </ul>
            </div>
            <AddRecord/>
          </div>
        )
      } else {
        return (
          <div>
            <p>Запросить доступ</p>
            <RequestPatientPermission/>
          </div>
        )
      }
    } else {
      return (
        <div>нет такого пациента</div>
      )
    }
  }
}

const mapStateToProps = state => ({
  web3: state.web3.instance
});

const mapDispatchToProps = dispatch => ({
  find: (patientAddress) => dispatch(find(patientAddress))
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientView);