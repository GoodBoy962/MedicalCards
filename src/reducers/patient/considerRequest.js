import { ReducerFactory } from '../../lib/util';
import {
  CONSIDER_REQUEST,
  CONSIDER_SUCCESS
} from '../../constants/patient/action';

const DState = {
  pending: false
};

const Actions = {

  [CONSIDER_REQUEST]:
    state => ({...state, pending: true}),

  [CONSIDER_SUCCESS]:
    state => ({...state, pending: false})

};

export default ReducerFactory(DState, Actions);

