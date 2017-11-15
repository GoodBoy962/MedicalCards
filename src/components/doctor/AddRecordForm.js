import React from 'react';
import { add } from "../../actions/doctor/addRecord";
import { connect } from "react-redux";

class AddRecordForm extends React.Component {

  constructor(props) {
    super(props);
    this.reader = new FileReader();
  }

  componentWillMount() {
    this.reader.onload = event => {
      const record = event.target.result;
      add(this.props.patientAddress, record);
    };
  }

  captureFile = (e) => {
    const file = e.target.files[0];
    this.reader.readAsText(file);
  };

  render() {
    return (
      <div className='AddRecordForm'>
        <p>Добавьте файл с записью</p>
        <input type='file' onChange={ this.captureFile }/><br/>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  patientAddress: state.patientSearch.patientAddress
});

const mapDispatchToProps = dispatch => ({
  add: (patientAddress, file) => dispatch(add(patientAddress, file))
});

export default connect(mapStateToProp, mapDispatchToProps)(AddRecordForm);
