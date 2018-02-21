import { ReducerFactory } from '../../lib/util';
import {
  REGISTER_DOCTOR_REQUEST,
  REGISTER_DOCTOR_SUCCESS
} from '../../constants/welcome/actions';

const DState = {
  pending: false,
  success: false
};

const Actions = {

  [REGISTER_DOCTOR_SUCCESS]: state =>
    ({...state, pending: false, success: true}),

  [REGISTER_DOCTOR_REQUEST]: state =>
    ({...state, pending: true})

};

export default ReducerFactory(DState, Actions);