import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import { load } from '../../actions/account';

class Profile extends React.Component {

  componentWillMount() {
    this.props.load();
  }

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
  web3: state.web3.instance,
  account: state.account.account,
  address: state.account.address,
  fetching: state.account.fetching
});

const mapDispatchToProps = dispatch => ({
  load: () => dispatch(load())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
