import { ReducerFactory } from "../../lib/util";
import {
  REGISTER_PATIENT_REQUEST,
  REGISTER_PATIENT_SUCCESS
} from "../../constants/welcome/actions";

const DState = {
  pending: false,
  success: false
};

const Actions = {

  [REGISTER_PATIENT_SUCCESS]: state =>
    ({...state, pending: false, success: true}),

  [REGISTER_PATIENT_REQUEST]: state =>
    ({...state, pending: true})

};

export default ReducerFactory(DState, Actions);