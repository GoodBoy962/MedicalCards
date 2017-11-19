import {
  REQUEST_PATIENT_PERMISSION_SUCCESS,
  REQUEST_PATIENT_PERMISSION_REQUEST
} from "../../constants/doctor/action";
import ContractService from '../../utils/ContractService';

export const update = () => ({
  type: REQUEST_PATIENT_PERMISSION_SUCCESS
});

export const request = (patientAddress) =>
  (dispatch, getState) => {

    dispatch({
      type: REQUEST_PATIENT_PERMISSION_REQUEST
    });

    const web3 = getState().web3.instance;

    ContractService.request(web3, patientAddress)
      .then(res => dispatch(update()))
      .catch(console.log);
  };