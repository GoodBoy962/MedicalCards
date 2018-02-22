import React from 'react';
import {
  Router,
  Route,
  IndexRoute
} from 'react-router';
import { History } from '../store/index';

import { connect } from 'react-redux';

import Patient from './containers/Patient';
import Doctor from './containers/Doctor';
import Welcome from './containers/Welcome';
import PatientProfile from './components/patient/Profile';
import DoctorProfile from './components/doctor/Profile';
import DoctorSearchForm from './components/patient/DoctorSearchForm';
import Records from './components/patient/Records';
import SearchPatient from './components/doctor/SearchPatient';
import WelcomePage from './components/welcome/WelcomePage';
import Initial from './containers/Initial';


class App extends React.Component{

  render(){
    const userAccount = this.props.userAccount;
    if(!userAccount.accountType){
      return (
        <Initial/>
      )
    }
    switch(userAccount.accountType){
      case 'patient':
        return (
          <Router history={History}>
            <Route path='/' component={Patient}>
              <IndexRoute component={PatientProfile}/>
              <Route path='profile' component={PatientProfile}/>
              <Route path='searchDoctor' component={DoctorSearchForm}/>
              <Route path='records' component={Records}/>
              <Route path='*' component={PatientProfile}/>
            </Route>
          </Router>
        );
      //TODO if accepted then =>  ..., otherwise return page with message that account is not accepted
      case 'doctor':
        return (
          <Router history={History}>
            <Route path='/' component={Doctor}>
              <IndexRoute component={DoctorProfile}/>
              <Route path='profile' component={DoctorProfile}/>
              <Route path='searchPatient' component={SearchPatient}/>
              <Route path='*' component={DoctorProfile}/>
            </Route>
          </Router>
        );
      case 'new' :
        return (
          <Router history={History}>
            <Route path='/' component={Welcome}>
              <IndexRoute component={WelcomePage}/>
              <Route path='*' component={WelcomePage}/>
            </Route>
          </Router>
        );
      default:
        return (
          <div>
            owner
          </div>
        );
    }
  }
}

const mapStateToProps = state => ({
  userAccount: state.account
});

export default connect(mapStateToProps)(App);

