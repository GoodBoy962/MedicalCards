import { ReducerFactory } from '../../lib/util';
import {
  GET_RECORDS_REQUEST,
  GET_RECORDS_SUCCESS
} from '../../constants/patient/action';

const DState = {
  list: [],
  fetching: false
};

const Actions = {

  [GET_RECORDS_REQUEST]:
    (state = DState) =>
      ({...state, fetching: true}),

  [GET_RECORDS_SUCCESS]:
    (state = DState, list) =>
      ({...state, list: list, fetching: false})

};

export default ReducerFactory(DState, Actions);