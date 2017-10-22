import React, { Component } from 'react';

class RequestList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requests: props.requests
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.requests.map((request, index) => {
            return <li key={index}> Request from doctor : {request[1]} {request[0]}</li>;
          })}
        </ul>
      </div>
    );
  }

}

export default RequestList;
