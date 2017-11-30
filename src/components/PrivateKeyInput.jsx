import React from 'react';
import { connect } from 'react-redux';
import { load } from '../actions/account';

class PrivateKeyInput extends React.Component {

  constructor(props) {
    super(props);
    this.reader = new FileReader();
  }

  componentWillMount() {
    this.reader.onload = event => {
      const file = event.target.result;
      this.props.load(file);
    };
  }

  handleUpload = (e) => {
    const file = e.target.files[0];
    this.reader.readAsText(file);
  };

  render() {
    return (
      <div className='PrivateKeyInput'>
        <p>Добавьте файл с приватным ключем</p>
        <input type='file' onChange={ this.handleUpload }/><br/>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  patientAddress: state.patientSearch.patientAddress
});

const mapDispatchToProps = dispatch => ({
  load: (file) => dispatch(load(file))
});

export default connect(mapStateToProp, mapDispatchToProps)(PrivateKeyInput);
