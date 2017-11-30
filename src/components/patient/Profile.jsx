import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

class Profile extends React.Component {

  render() {
    if (!this.props.fetching) {
      const patient = this.props.account;
      const address = this.props.address;
      if (patient) {
        return (
          <div className='Profile'>
            <p>Профиль пациента</p>
            <p>ФИО: { patient.name } { patient.surname }</p>
            <p>Паспорт: { patient.passport }</p>
            <p>Адрес: { address }</p>
          </div>
        )
      } else {
        return (null);
      }
    } else {
      return (
        <CircularProgress size={ 50 }/>
      )
    }
  }
}

const mapStateToProps = state => ({
  account: state.account.account,
  address: state.account.address,
  fetching: state.account.fetching
});

export default connect(mapStateToProps)(Profile);
