import { routerReducer } from 'react-router-redux';

import ipfs from './ipfs';
import account from './account';
import doctorSearch from './patient/doctorSearch';
import approveDoctor from './patient/approveDoctor';
import patientSearch from './doctor/patientSearch';
import addRecord from './doctor/addRecord';
import registerPatient from './welcome/registerPatient';
import registerDoctor from './welcome/registerDoctor';

export default {
  routing: routerReducer,
  ipfs,
  account,
  doctorSearch,
  approveDoctor,
  patientSearch,
  addRecord,
  registerPatient,
  registerDoctor,
}