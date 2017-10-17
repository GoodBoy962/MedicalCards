import React, { Component } from 'react';
import ContractService from '../../utils/ContractService';

class AddRecordForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      patientAddress: props.patientAddress
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    ContractService.addRecord(this.state.web3,
                              this.state.patientAddress,
                              this.refs.value.value);
    e.preventDefault();
  }

  render() {
    return(
      <div className = 'AddRecordForm'>
        <form onSubmit={this.handleSubmit}>
          <label>New record</label><br/>
          <textarea ref='value'/><br/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
}

export default AddRecordForm;
