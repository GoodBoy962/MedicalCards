import React from 'react';
import { connect } from 'react-redux';

import { consider } from '../../actions/patient/considerRequest';
import { load } from '../../actions/patient/requests';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Delete from 'material-ui-icons/Delete';
import Send from 'material-ui-icons/Send';
import { CircularProgress } from 'material-ui/Progress';

class IncomingRequests extends React.Component {

  componentWillMount() {
    this.props.load();
  }

  handleAccept = (index, address, e) => {
    this.props.consider(index, address, true);
    e.preventDefault();
  };

  handleDecline = (index, address, e) => {
    this.props.consider(index, address, false);
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
                      <Button raised color="contrast" onClick={ this.handleAccept.bind(this, i, request) }>
                        <Send/>
                        Принять
                      </Button>
                      <Button raised color="accent" onClick={ this.handleDecline.bind(this, i, request) }>
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
  consider: (index, address, decision) => dispatch(consider(index, address, decision)),
  load: () => dispatch(load())
});

export default connect(mapStateToProps, mapDispatchToProps)(IncomingRequests);