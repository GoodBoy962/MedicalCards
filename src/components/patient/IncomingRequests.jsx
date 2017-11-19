import React from 'react';
import { connect } from "react-redux";
import { load } from "../../actions/patient/requests";
import { consider } from "../../actions/patient/considerRequest";

import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Delete from 'material-ui-icons/Delete';
import Send from 'material-ui-icons/Send';
import { CircularProgress } from 'material-ui/Progress';

class IncomingRequests extends React.Component {

  componentWillMount() {
    this.props.load();
  }

  handleAccept = (index, e) => {
    this.props.consider(index, true);
    e.preventDefault();
  };

  handleDecline = (index, e) => {
    this.props.consider(index, false);
    e.preventDefault();
  };

  render() {
    if (!this.props.fetching && !this.props.pending) {
      return (
        <div>
          <p>Запросы</p>
          <List>
            {
              this.props.requests.map((request, i) => {
                if (this.props.web3.utils.hexToNumberString(request) > 0) {
                  return (
                    <ListItem button key={ i }>
                      <ListItemText inset primary={ request }/>
                      <Button raised color="contrast" onClick={ this.handleAccept.bind(this, i) }>
                        <Send/>
                        Принять
                      </Button>
                      <Button raised color="accent" onClick={ this.handleDecline.bind(this, i) }>
                        Отказать
                        <Delete/>
                      </Button>
                    </ListItem>
                  )
                }
              })
            }
          </List>
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
  web3: state.web3.instance,
  requests: state.requests.list,
  fetching: state.requests.fetching,
  pending: state.considerRequest.pending
});

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(load()),
  consider: (index, decision) => dispatch(consider(index, decision))
});

export default connect(mapStateToProps, mapDispatchToProps)(IncomingRequests);