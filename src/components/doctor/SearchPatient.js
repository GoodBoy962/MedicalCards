import React from 'react';
import { connect } from 'react-redux';
import { load } from "../../actions/account";
import { find } from "../../actions/doctor/patientSearch";
import { CircularProgress } from "material-ui";
import PatientView from './PatientView';

class SearchForm extends React.Component {

  handleSubmit = (e) => {
    const patientAddress = this.refs.address.value;
    const doctorAddress = this.props.address;
    this.props.find(doctorAddress, patientAddress);
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Введите адрес пациента<br/>
          <input type='text' ref='address' placeholder='адрес'/>
        </label>
        <input type='submit' value='search'/>
      </form>)
  }
}

const SearchPatient = ({ patientProfile, address, find, load }) => {
  !!!address && load();
  return (
    <div>
      <SearchForm find={find} address={address}/>
      <div>{patientProfile.fetching ?
        <CircularProgress size={50}/>
        : (!!patientProfile.patient) ?
          <PatientView patientProfile={patientProfile}/> :
          null}
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  account: state.account.account,
  address: state.account.address,
  patientProfile: state.patientSearch
});

const mapDispatchToProps = dispatch => ({
  find: (doctorAddress, patientAddress) => dispatch(find(doctorAddress, patientAddress)),
  load: () => dispatch(load())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPatient);
