import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';
import { History } from '../store/index';
import Patient from '../containers/Patient';
import Doctor from '../containers/Doctor';
import Welcome from '../containers/Welcome';
import PatientProfile from '../components/patient/Profile';
import DoctorProfile from '../components/doctor/Profile';
import DoctorSearchForm from '../components/patient/DoctorSearchForm';
import SearchPatient from '../components/doctor/SearchPatient';
import IncomingRequests from '../components/patient/IncomingRequests';
import WelcomePage from '../components/welcome/WelcomePage';
import Initial from './Initial';

import { connect } from 'react-redux';

class App extends React.Component {

  render() {
    if (!this.props.userAccount.accountType) {
      return (
        <Initial />
      )
    } else {
      switch (this.props.userAccount.accountType) {
        case 'patient':
          return (
            <Router history={ History }>
              <Route path='/' component={ Patient }>
                <IndexRoute component={ PatientProfile }/>
                <Route path='profile' component={ PatientProfile }/>
                <Route path='searchDoctor' component={ DoctorSearchForm }/>
                <Route path='requests' component={ IncomingRequests }/>
                <Route path='*' component={ PatientProfile }/>
              </Route>
            </Router>
          );
          break;
        //TODO if accepted then =>  ..., otherwise return page with message that account is not accepted
        case 'doctor':
          return (
            <Router history={ History }>
              <Route path='/' component={ Doctor }>
                <IndexRoute component={ DoctorProfile }/>
                <Route path='profile' component={ DoctorProfile }/>
                <Route path='searchPatient' component={ SearchPatient }/>
                <Route path='*' component={ DoctorProfile }/>
              </Route>
            </Router>
          );
          break;
        case 'new' :
          return (
            <Router history={ History }>
              <Route path='/' component={ Welcome }>
                <IndexRoute component={ WelcomePage }/>
                <Route path='*' component={ WelcomePage }/>
              </Route>
            </Router>
          );
          break;
        default:
          return (
            <div>
              owner
            </div>
          );
      }
    }
  }
}

const mapStateToProps = state => ({
  userAccount: state.account
});

export default connect(mapStateToProps)(App);

