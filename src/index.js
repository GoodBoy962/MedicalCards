import 'normalize.css';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from 'registerServiceWorker';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { Store, History } from 'store/index';
import Patient from './containers/Patient';
import Doctor from './containers/Doctor';
import Welcome from './containers/Welcome';
import PatientProfile from './components/patient/Profile';
import DoctorProfile from './components/doctor/Profile';
import DoctorSearchForm from './components/patient/DoctorSearchForm';
import SearchPatient from './components/doctor/SearchPatient';
import IncomingRequests from './components/patient/IncomingRequests';
import ContractService from './utils/ContractService';
import WelcomePage from "./components/welcome/WelcomePage";

//depends on account type return its menu
const web3 = Store.getState().web3.instance;
ContractService.getAccount(web3).then(account => {
  switch (account.type) {
    case 'patient':
      ReactDOM.render(
        <Provider store={Store}>
          <Router history={History}>
            <Route path='/' component={Patient}>
              <IndexRoute component={PatientProfile}/>
              <Route path='profile' component={PatientProfile}/>
              <Route path='searchDoctor' component={DoctorSearchForm}/>
              <Route path='requests' component={IncomingRequests}/>
            </Route>
          </Router>
        </Provider>,
        document.getElementById('root')
      );
      registerServiceWorker();
      break;
    case 'doctor':
      ReactDOM.render(
        <Provider store={Store}>
          <Router history={History}>
            <Route path='/' component={Doctor}>
              <IndexRoute component={DoctorProfile}/>
              <Route path='profile' component={DoctorProfile}/>
              <Route path='searchPatient' component={SearchPatient}/>
            </Route>
          </Router>
        </Provider>,
        document.getElementById('root')
      );
      registerServiceWorker();
      break;
    case 'new' :
      ReactDOM.render(
        <Provider store={Store}>
          <Router history={History}>
            <Route path='/' component={Welcome}>
              <IndexRoute component={WelcomePage}/>
              <Route path='profile' component={DoctorProfile}/>
            </Route>
          </Router>
        </Provider>,
        document.getElementById('root')
      );
      registerServiceWorker();
      break;
    default:

      registerServiceWorker();
      break;
  }
});

