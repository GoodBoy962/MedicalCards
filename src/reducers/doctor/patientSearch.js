import { ReducerFactory } from '../../lib/util';
import {
  FIND_PATIENT_REQUEST,
  FIND_PATIENT_SUCCESS
} from '../../constants/doctor/action';

const DState = {
  patient: null,
  profile: null,
  patientAddress: null,
  available: null,
  records: [],
  fetching: false
};

const Actions = {

  [FIND_PATIENT_REQUEST]:
    (state = DState) =>
      ({
        ...state,
        fetching: true
      }),

  [FIND_PATIENT_SUCCESS]:
    (state = DState, {patient, profile, patientAddress, available, records}) =>
      ({
        ...state,
        patient: patient,
        profile: profile,
        patientAddress: patientAddress,
        available: available,
        records: records,
        fetching: false
      })

};

export default ReducerFactory(DState, Actions);