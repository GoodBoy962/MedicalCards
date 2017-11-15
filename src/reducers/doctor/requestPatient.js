import { ReducerFactory } from "../../lib/util";
import {
  REQUEST_PATIENT_PERMISSION_REQUEST,
  REQUEST_PATIENT_PERMISSION_SUCCESS
} from "../../constants/doctor/action";

const DState = {
  fetching: false
};

const Actions = {

  [REQUEST_PATIENT_PERMISSION_SUCCESS]:
    state => ({...state, fetching: false}),

  [REQUEST_PATIENT_PERMISSION_REQUEST]:
    state => ({...state, fetching: true})

};

export default ReducerFactory(DState, Actions);