import { routerReducer } from 'react-router-redux';

import account from './account';
import doctorSearch from './patient/doctorSearch';
import approveDoctor from './patient/approveDoctor';
import patientSearch from './doctor/patientSearch';
import addRecord from './doctor/addRecord';
import registerPatient from './welcome/registerPatient';
import registerDoctor from './welcome/registerDoctor';

export default {
  routing: routerReducer,
  account,
  doctorSearch,
  approveDoctor,
  patientSearch,
  addRecord,
  registerPatient,
  registerDoctor,
}