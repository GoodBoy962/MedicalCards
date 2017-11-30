import React from 'react';
import { connect } from 'react-redux';

import { add } from '../../actions/doctor/addRecord';

class AddRecord extends React.Component {

  constructor(props) {
    super(props);
    this.reader = new FileReader();
  }

  componentWillMount() {
    this.reader.onload = event => {
      const record = event.target.result;
      this.props.add(this.props.patientAddress, this.props.patientPublicKey, record);
    };
  }

  handleUpload = (e) => {
    const file = e.target.files[0];
    this.reader.readAsText(file);
  };

  render() {
    return (
      <div className='AddRecordForm'>
        <p>Добавьте файл с записью</p>
        <input type='file' onChange={ this.handleUpload }/><br/>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  patientAddress: state.patientSearch.patientAddress,
  patientPublicKey: state.patientSearch.patient.publicKey
});

const mapDispatchToProps = dispatch => ({
  add: (patientAddress, patientPublicKey, file,) => dispatch(add(patientAddress, patientPublicKey, file))
});

export default connect(mapStateToProp, mapDispatchToProps)(AddRecord);
