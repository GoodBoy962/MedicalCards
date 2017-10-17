import React, { Component } from 'react';

class RequestPatientPermissionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patientAddress: props.patientAddress
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log('submitting... ', this.state.patientAddress);
    e.preventDefault();
  }

  render() {
    return (
      <div className='RequestPatientPermissionForm' onSubmit={this.handleSubmit}>
        <form>
          <input type='submit' value='request'/>
        </form>
      </div>
    );
  }

}

export default RequestPatientPermissionForm;
