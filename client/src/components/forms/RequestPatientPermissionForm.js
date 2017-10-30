import React, { Component } from 'react';
import RequestService from '../../utils/RequestsService';

class RequestPatientPermissionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patientAddress: props.patientAddress,
      doctorAddress: props.doctorAddress,
      requested: props.requested
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    RequestService.requestPatientPermission(this.state.patientAddress, this.state.doctorAddress)
      .then((err, res) => {});
    e.preventDefault();
  }

  render() {
    let form = null;
    if (!this.state.requested) {
      form =
          <form onSubmit={this.handleSubmit}>
            <input type='submit' value='request'/>
            <submit value='request'/>
          </form>;
    }
    return (
      <div className='RequestPatientPermissionForm'>
        <p>You are not accepted</p>
        {form}
      </div>
    );
  }

}

export default RequestPatientPermissionForm;
