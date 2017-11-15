import React from 'react';
import { connect } from "react-redux";
import { request } from '../../actions/doctor/requestPatient';

class RequestPatientPermissionForm extends React.Component {

  handleSubmit = () => {
    console.log(this.props.doctorAddress);
  };

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input type='submit' value='запросить'/>
      </form>
    );
  }

}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  request: (doctorAddress, patientAddress) => dispatch(request(doctorAddress, patientAddress))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestPatientPermissionForm);
