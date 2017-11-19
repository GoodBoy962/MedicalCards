import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from "react-redux";
import { load } from "../../actions/patient/requests";

class IncomingRequests extends React.Component {

  componentWillMount() {
    this.props.load();
  }

  render() {
    if (!this.props.fetching) {
      return (
        <div>
          <p>Запросы</p>
          {
            this.props.requests.map((request, i) => {
              return <li key={ i }>{ request }</li>
            })
          }
        </div>
      )
    } else {
      return (
        <CircularProgress/>
      )
    }
  }

}

const mapStateToProps = (state) => ({
  requests: state.requests.list,
  fetching: state.requests.fetching
});

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(load())
});

export default connect(mapStateToProps, mapDispatchToProps)(IncomingRequests);