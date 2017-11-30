import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

import DoctorView from './DoctorView';

import { connect } from 'react-redux';
import { load } from '../../actions/account';
import { find } from '../../actions/patient/doctorSearch';

class SearchForm extends React.Component {

  handleSubmit = (e) => {
    const doctorAddress = this.refs.address.value;
    const patientAddress = this.props.address;
    console.log('PatientAddress', patientAddress);
    this.props.find(doctorAddress, patientAddress);
    e.preventDefault();
  };

  render() {
    return (<form onSubmit={ this.handleSubmit }>
      <p><label>Введите адрес врача</label></p>
      <input type='text' ref='address' placeholder='адрес'/>
      <input type='submit' value='Найти'/>
    </form>)
  }
}

const DoctorSearchForm = ({doctorProfile, address, find, load}) => {
  !!!address && load();
  return (
    <div>
      <SearchForm find={ find } address={ address }/>
      <div>{ doctorProfile.fetching ?
        <CircularProgress size={ 50 }/>
        : (!!doctorProfile.doctor) ?
          <DoctorView doctorProfile={ doctorProfile }/> :
          null }
      </div>
    </div>
  )
};


const mapStateToProps = state => ({
  account: state.account.account,
  address: state.account.address,
  doctorProfile: state.doctorSearch
});

const mapDispatchToProps = dispatch => ({
  find: (doctorAddress, patientAddress) => dispatch(find(doctorAddress, patientAddress)),
  load: () => dispatch(load())
});


export default connect(mapStateToProps, mapDispatchToProps)(DoctorSearchForm);
