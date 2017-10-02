import React, { Component } from 'react';

class PatientRegistrationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contract: props.contract
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log(this.state);
    // this.state.contract.applyPatient.call(
    //   {
    //     _name: this.refs.name.value,
    //     _surname: this.refs.surname.value,
    //     _passport: this.refs.passport.value,
    //     _birthday: new Date(this.refs.birthday.value).getTime()
    //   },
    //   (err, res) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(res);
    //   }
    // });
    e.preventDefault();
  }

  render() {
    return (
      <div className = 'PatientRegistrationForm'>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label><br/>
          <input type='text' ref='name'/><br/>
          <label>Surname</label><br/>
          <input type='text' ref="surname"/><br/>
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
