import React from 'react';
import dateFormat from 'dateformat'

import AddRecord from './AddRecord';

export default class PatientView extends React.Component {

  render() {
    const patientProfile = this.props.patientProfile;
    const patient = patientProfile.profile;
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
                  return <li key={ index }> { record } </li>;
                }) }
              </ul>
            </div>
            <AddRecord/>
          </div>
        )
      } else {
        return (
          <div>
            <p>Нет доступа</p>
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