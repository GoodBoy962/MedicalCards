import {
  REQUEST_PATIENT_PERMISSION_SUCCESS,
  REQUEST_PATIENT_PERMISSION_REQUEST
} from "../../constants/doctor/action";
// import ContractService from '../../utils/ContractService';

export const update = () => ({
  type: REQUEST_PATIENT_PERMISSION_SUCCESS
});

export const request = (doctorAddress, patientAddress) =>
  (dispatch, getState) => {

    dispatch({
      type: REQUEST_PATIENT_PERMISSION_REQUEST
    });

    //TODO realize request logic in SC
  };