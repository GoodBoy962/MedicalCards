import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

class Profile extends React.Component {

  render() {
    if (!this.props.fetching) {
      const profile = this.props.profile;
      const address = this.props.address;
      if (profile) {
        return (
          <div className='Profile'>
            <p>Профиль пациента</p>
            <p>ФИО: { profile.name } { profile.surname }</p>
            <p>Паспорт: { profile.passport }</p>
            <p>Адрес: { address }</p>
          </div>
        )
      }
      return (null);
    }
    return (
      <CircularProgress size={ 50 }/>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account.account,
  profile: state.account.profile,
  address: state.account.address,
  fetching: state.account.fetching
});

export default connect(mapStateToProps)(Profile);
