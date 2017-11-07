import React, { Component } from 'react';
import ContractService from '../../utils/ContractService';
import ipfsAPI from 'ipfs-api';

class AddRecordForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      patientAddress: props.patientAddress
    }
    this.ipfs = ipfsAPI('localhost', '5001');
    this.reader = new FileReader();

    this.captureFile = this.captureFile.bind(this);
  }

  componentWillMount() {
     this.reader.onload = event => {
       const record = event.target.result;
       const recordBuf = Buffer.from(record, 'utf8');
       this.ipfs.files.add(recordBuf).then((res, err) => {
         ContractService.addRecord(this.state.web3,
                                   this.state.patientAddress,
                                   res[0].hash);
       });
     };
  }

  captureFile(e) {
    const file = e.target.files[0];
    this.reader.readAsText(file);
  }

  render() {
    return(
      <div className = 'AddRecordForm'>
        <form onSubmit={this.handleSubmit}>
          <label>New record</label><br/>
          <input type='file' onChange={this.captureFile} /><br/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
}

export default AddRecordForm;
