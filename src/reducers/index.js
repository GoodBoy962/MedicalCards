import { routerReducer } from 'react-router-redux';

import web3 from './web3';
import ipfs from './ipfs';
import account from './account';
import doctorSearch from './patient/doctorSearch';
import approveDoctor from './patient/approveDoctor';
import patientSearch from './doctor/patientSearch';
import requestPatient from './doctor/requestPatient';
import addRecord from './doctor/addRecord';

export default {
  routing: routerReducer,
  web3,
  ipfs,
  account,
  doctorSearch,
  approveDoctor,
  patientSearch,
  requestPatient,
  addRecord
}