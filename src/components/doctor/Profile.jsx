import React from 'react';

import { CircularProgress } from 'material-ui/Progress';

import { connect } from 'react-redux';

class Profile extends React.Component {

  render() {
    if (!this.props.fetching) {
      const doctor = this.props.account;
      const address = this.props.address;
      if (doctor) {
        return (
          <div className='Profile'>
            <p>Профиль доктора</p>
            <p>ФИО: { doctor.name } { doctor.surname }</p>
            <p>Паспорт: { doctor.passport }</p>
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
  web3: state.web3.instance,
  account: state.account.account,
  address: state.account.address,
  fetching: state.account.fetching
});

export default connect(mapStateToProps)(Profile);
