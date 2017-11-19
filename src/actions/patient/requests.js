import {
  GET_INCOMING_REQUESTS_SUCCESS,
  GET_INCOMING_REQUESTS_REQUEST
} from "../../constants/patient/action";
import ContractService from '../../utils/ContractService';

export const update = (list) => ({
  type: GET_INCOMING_REQUESTS_SUCCESS,
  list
});

export const load = () =>
  (dispatch, getState) => {

    dispatch({
      type: GET_INCOMING_REQUESTS_REQUEST
    });

    const web3 = getState().web3.instance;
    ContractService.getRequests(web3)
      .then(requests => setTimeout(() => dispatch(update(requests)), 1000))
      .catch(console.log);
  };