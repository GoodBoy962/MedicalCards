import { ReducerFactory } from '../../lib/util';
import {
  FIND_PATIENT_REQUEST,
  FIND_PATIENT_SUCCESS
} from '../../constants/doctor/action';

const DState = {
  patient: null,
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
    (state = DState, {patient, patientAddress, available, records}) =>
      ({
        ...state,
        patient: patient,
        patientAddress: patientAddress,
        available: available,
        records: records,
        fetching: false
      })

};

export default ReducerFactory(DState, Actions);