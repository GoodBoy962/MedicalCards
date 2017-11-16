import React from 'react';
import { connect } from "react-redux";
import { request } from '../../actions/doctor/requestPatient';

class RequestPatientPermission extends React.Component {

  handleSubmit = (e) => {
    console.log(this.props);
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input type='submit' value='запросить'/>
      </form>
    );
  }

}

const mapStateToProps = state => ({
  doctorAddress: state.account.address,
  patientAddress: state.patientSearch.patientAddress
});

const mapDispatchToProps = dispatch => ({
  request: (doctorAddress, patientAddress) => dispatch(request(doctorAddress, patientAddress))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestPatientPermission);
