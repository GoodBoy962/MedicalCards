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
    console.log(this.state);
    // this.state.contract.applyDoctor.call(
    //   {
    //     _name: this.refs.name.value,
    //     _surname: this.refs.surname.value,
    //     _passport: this.refs.passport.value,
    //     _medClinic: this.refs.medClinic.value,
    //     _category: this.refs.category.vaue
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
