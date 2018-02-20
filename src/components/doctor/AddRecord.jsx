import React from 'react';
import { connect } from 'react-redux';

import { CircularProgress } from 'material-ui/Progress';

import { add } from '../../actions/doctor/addRecord';

class AddRecord extends React.Component {

  constructor(props) {
    super(props);
    this.reader = new FileReader();
  }

  componentWillMount() {
    this.reader.onload = event => {
      const record = event.target.result;
      this.props.add(record);
    };
  }

  handleUpload = (e) => {
    const file = e.target.files[0];
    this.reader.readAsText(file);
  };

  render() {
    if (!this.props.fetching) {
      return (
        <div className='AddRecordForm'>
          <p>Добавьте файл с записью</p>
          <input type='file' onChange={ this.handleUpload }/><br/>
        </div>
      );
    } return <CircularProgress/>
  }
}

const mapStateToProps = state => ({
  fetching: state.addRecord.fetching
});

const mapDispatchToProps = dispatch => ({
  add: file => dispatch(add(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecord);
