import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/welcome/registerPatient';
import { CircularProgress } from 'material-ui/Progress';

class PatientRegistrationForm extends React.Component {

  handleSubmit = (e) => {
    const name = this.refs.name.value;
    const surname = this.refs.surname.value;
    const passport = this.refs.passport.value;
    const birthday = new Date(this.refs.birthday.value).getTime();
    this.props.register(name, surname, passport, birthday);
    e.preventDefault();
  };

  render() {
    if (!this.props.pendingPatient) {
      if (this.props.successPatient) {
        return (
          <div>Регистрация завершена! Менее чем через минуту пациент появится в системе</div>
        )
      }
      return (
        <div className='PatientRegistrationForm'>
          <form onSubmit={ this.handleSubmit }>
            <label>Имя</label><br/>
            <input type='text' ref='name'/><br/>
            <label>Фамилия</label><br/>
            <input type='text' ref='surname'/><br/>
            <label>Серия и номер паспорта</label><br/>
            <input type='number' ref='passport'/><br/>
            <label>Дата рождения</label><br/>
            <input type='date' ref='birthday'/><br/>
            <input type='submit' value='Зарегестрироваться'/>
          </form>
        </div>
      );
    }
    return (
      <CircularProgress/>
    )
  }
}

const mapStateToProps = state => ({
  pendingPatient: state.registerPatient.pending,
  successPatient: state.registerPatient.success
});

const mapDispatchToProps = dispatch => ({
  register: (name, surname, passport, birthday) => dispatch(register(name, surname, passport, birthday))
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientRegistrationForm);
