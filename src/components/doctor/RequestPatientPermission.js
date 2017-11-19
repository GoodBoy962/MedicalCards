import React from 'react';
import { connect } from "react-redux";
import { request } from '../../actions/doctor/requestPatient';

class RequestPatientPermission extends React.Component {

  handleSubmit = (e) => {
    this.props.request(this.props.patientAddress);
    e.preventDefault();
  };

  render() {
    if (!this.props.fetching) {
      return (
        <form onSubmit={ this.handleSubmit }>
          <input type='submit' value='запросить'/>
        </form>
      );
    } else {
      return (
        <div>
          <p>Доступ запрошен!</p>
        </div>
      )
    }
  }

}

const mapStateToProps = state => ({
  patientAddress: state.patientSearch.patientAddress,
  fetching: state.patientSearch.fetching
});

const mapDispatchToProps = dispatch => ({
  request: (patientAddress) => dispatch(request(patientAddress))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestPatientPermission);
