import { ReducerFactory } from '../../lib/util';
import {
  GET_INCOMING_REQUESTS_REQUEST,
  GET_INCOMING_REQUESTS_SUCCESS
} from '../../constants/patient/action';

const DState = {
  list: [],
  fetching: false
};

const Actions = {

  [GET_INCOMING_REQUESTS_REQUEST]: (state = DState) =>
    ({...state, fetching: true}),

  [GET_INCOMING_REQUESTS_SUCCESS]: (state = DState, {list}) =>
    ({...state, list: list, fetching: false})

};

export default ReducerFactory(DState, Actions);