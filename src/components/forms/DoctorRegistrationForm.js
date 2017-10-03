import React, { Component } from 'react';

class DoctorRegistrationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contract: props.contract
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const name = this.refs.name.value;
    const surname = this.refs.surname.value;
    const passport = this.refs.passport.value;
    const medClinic = this.refs.medClinic.value;
    const category = this.refs.category.value;
    const contract = this.state.contract;
    contract.applyDoctor.call(
      name, surname, passport, medClinic, category,
      (err, res) => {}
    );
    contract.applyDoctor(
      name, surname, passport, medClinic, category,
      (err, res) => {
        console.log(res);
      }
    )

    e.preventDefault();
  }

  render() {
    return (
      <div className = 'DoctorRegistrationForm'>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label><br/>
          <input type='text' ref='name'/><br/>
          <label>Surname</label><br/>
          <input type='text' ref="surname"/><br/>
          <label>Passport</label><br/>
          <input type='number' ref='passport'/><br/>
          <label>Medical clinic</label><br/>
          <input type='text' ref='medClinic'/><br/>
          <label>Category</label><br/>
          <input type='text' ref='category'/><br/>
          <input type='submit' value='Registrate' />
        </form>
      </div>
    );
  }
}

export default DoctorRegistrationForm;
