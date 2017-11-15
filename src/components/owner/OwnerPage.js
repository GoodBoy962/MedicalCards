import React, { Component } from 'react';

class OwnerPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3
    }
  }

  render() {
    //TODO view the list of doctos to approve
    //Or do that by address
    return (
      <div className='OwnerPage'>
        <p>Hello owner!</p>
      </div>
    );
  }
}

export default OwnerPage;
