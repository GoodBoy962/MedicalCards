import React from 'react';
import { connect } from 'react-redux';
import { load } from '../../../actions/patient/records';
import { CircularProgress } from 'material-ui/Progress';

class Records extends React.Component {

  componentWillMount() {
    this.props.load();
  }

  render() {
    if (!this.props.fetching) {
      if (this.props.records.length > 0) {
        return (
          <div>
            <p>Записи</p>
            <ul>
              {
                this.props.records.map((record, index) => {
                  return <li key={ index }> { record } </li>;
                })
              }
            </ul>
          </div>
        )
      } return <div>Нет записей</div>
    }
    return <CircularProgress/>
  }
}

const mapStateToProps = state => ({
  records: state.records.list,
  fetching: state.records.fetching
});

const mapDispatchToProps = dispatch => ({
  load: () => dispatch(load())
});

export default connect(mapStateToProps, mapDispatchToProps)(Records);