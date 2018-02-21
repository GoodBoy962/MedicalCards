import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/welcome/registerDoctor';
import { CircularProgress } from 'material-ui/Progress';

class DoctorRegistrationForm extends React.Component {

  handleSubmit = (e) => {
    const name = this.refs.name.value;
    const surname = this.refs.surname.value;
    const passport = this.refs.passport.value;
    const medClinic = this.refs.medClinic.value;
    const category = this.refs.category.value;
    this.props.register(name, surname, passport, medClinic, category);
    e.preventDefault();
  };

  render() {
    if (!this.props.pendingDoctor) {
      if (this.props.successDoctor) {
        return (
          <div>Регистрация завершена! Менее чем через минуту врач появится в системе</div>
        )
      }
      return (
        <div className='DoctorRegistrationForm'>
          <form onSubmit={ this.handleSubmit }>
            <label>Имя</label><br/>
            <input type='text' ref='name'/><br/>
            <label>Фамилия</label><br/>
            <input type='text' ref="surname"/><br/>
            <label>Серия и номер паспорта</label><br/>
            <input type='number' ref='passport'/><br/>
            <label>Место работы</label><br/>
            <input type='text' ref='medClinic'/><br/>
            <label>Специальность</label><br/>
            <input type='text' ref='category'/><br/>
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
  pendingDoctor: state.registerDoctor.pending,
  successDoctor: state.registerDoctor.success
});

const mapDispatchToProps = dispatch => ({
  register: (name, surname, passport, medClinic, category) =>
    dispatch(register(name, surname, passport, medClinic, category))
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRegistrationForm);
