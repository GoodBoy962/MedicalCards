import { combineReducers } from 'redux'

const DOCTOR = 'doctor';
const PATIENT = 'patient';
const OWNER = 'owner';

function user(state = {}, action) {
	if (action.type === DOCTOR || action.type === PATIENT || action.type === OWNER) {
		return action.payload
	}
	return state
}

const reducer = combineReducers({
  user
})

export default reducer
