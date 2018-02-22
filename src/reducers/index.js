import { routerReducer } from 'react-router-redux';

import account from './account';
import doctorSearch from './patient/doctorSearch';
import approveDoctor from './patient/approveDoctor';
import records from './patient/records';
import patientSearch from './doctor/patientSearch';
import addRecord from './doctor/addRecord';
import registerPatient from './welcome/registerPatient';
import registerDoctor from './welcome/registerDoctor';

export default {
  routing: routerReducer,
  account,
  doctorSearch,
  approveDoctor,
  records,
  patientSearch,
  addRecord,
  registerPatient,
  registerDoctor,
}