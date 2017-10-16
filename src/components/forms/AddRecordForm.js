import React, { Component } from 'react';


class AddRecord extends Component {

  constructor(props) {
    super(props);
    this.state = {
      etherbase: props.etherbase,
      contract: props.contract,
      patient: props.patient
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('submitting...');
  }

  render() {
    let patient = this.state.patient;
    return(
      <div className = 'AddRecord'>
        <form onSubmit={this.handleSubmit}>
          <label>For the patient {patient[0]} {patient[1]}</label><br/>
          <textarea ref='value'/><br/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
}

export default AddRecord;
