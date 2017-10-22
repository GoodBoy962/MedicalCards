import React, { Component } from 'react';
import ContractService from '../../utils/ContractService';

class PatientRegistrationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const name = this.refs.name.value;
    const surname = this.refs.surname.value;
    const passport = this.refs.passport.value;
    const birthday = new Date(this.refs.birthday.value).getTime();
    ContractService
      .registratePatient(this.state.web3, name, surname, passport, birthday)
      .then((err, res) => {});
    e.preventDefault();
  }

  render() {
    return (
      <div className = 'PatientRegistrationForm'>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label><br/>
          <input type='text' ref='name'/><br/>
          <label>Surname</label><br/>
          <input type='text' ref='surname'/><br/>
          <label>Passport</label><br/>
          <input type='number' ref='passport'/><br/>
          <label>Birthday</label><br/>
          <input type='date' ref='birthday'/><br/>
          <input type='submit' value='Registrate' />
        </form>
      </div>
    );
  }
}

export default PatientRegistrationForm;
