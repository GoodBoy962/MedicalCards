import { ReducerFactory } from "../../lib/util";
import {
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS
} from "../../constants/doctor/action";

const DState = {
  fetching: false
};

const Actions = {

  [ADD_RECORD_SUCCESS]:
    state => ({...state, fetching: false}),

  [ADD_RECORD_REQUEST]:
    state => ({...state, fetching: true})

};

export default ReducerFactory(DState, Actions);