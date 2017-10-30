import React, { Component } from 'react';
import ContractService from '../utils/ContractService';
import RequestService from '../utils/RequestsService';

class RequestList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requests: props.requests,
      web3: props.web3
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const doctorAddress = e.target.id;
    ContractService.acceptDoctorForPatient(this.state.web3, doctorAddress).then((res, err) => {
      // if (res) {
        // RequestsService.deleteRequest(e.target.id);
      // }
    });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.requests.map((request, index) => {
            return (
              <li key={index}>
                Request from doctor : {request[1]} {request[0]}
                <button id={request.address} onClick={this.handleClick}>accept</button>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }

}

export default RequestList;
