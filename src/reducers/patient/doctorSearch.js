import { ReducerFactory } from '../../lib/util';
import {
  FIND_DOCTOR_REQUEST,
  FIND_DOCTOR_SUCCESS
} from '../../constants/patient/action';

const DState = {
  doctor: null,
  profile: null,
  doctorAddress: null,
  accepted: null,
  fetching: false
};

const Actions = {

  [FIND_DOCTOR_REQUEST]:
    (state = DState, {doctor, profile, doctorAddress, accepted}) =>
      ({...state, doctor: doctor, profile: profile, doctorAddress: doctorAddress, accepted: accepted, fetching: true}),

  [FIND_DOCTOR_SUCCESS]:
    (state = DState, {doctor, profile, doctorAddress, accepted}) =>
      ({...state, doctor: doctor, profile: profile, doctorAddress: doctorAddress, accepted: accepted, fetching: false})

};

export default ReducerFactory(DState, Actions);