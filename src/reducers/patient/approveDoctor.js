import { ReducerFactory } from '../../lib/util';
import {
  APPROVE_DOCTOR_REQUEST,
  APPROVE_DOCTOR_SUCCESS
} from "../../constants/patient/action";

const DState = {
  pending: false
};

const Actions = {

  [APPROVE_DOCTOR_REQUEST]:
    state => ({ ...state, pending: true }),

  [APPROVE_DOCTOR_SUCCESS]:
    state => ({ ...state, pending: false })

};

export default ReducerFactory(DState, Actions);