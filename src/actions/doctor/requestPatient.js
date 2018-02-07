import {
  REQUEST_PATIENT_PERMISSION_SUCCESS,
  REQUEST_PATIENT_PERMISSION_REQUEST
} from "../../constants/doctor/action";
// import ContractService from '../../utils/ContractService';

const update =
  () =>
    ({ type: REQUEST_PATIENT_PERMISSION_SUCCESS });

export const request =
  patientAddress =>
    (dispatch, getState) => {

      dispatch({
        type: REQUEST_PATIENT_PERMISSION_REQUEST
      });

      const web3 = getState().web3.instance;
      const privateKey = getState().account.privateKey;
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const contract = getState().web3.contract;

      // ContractService.request(web3, account, contract, patientAddress)
      //   .then(res => () => setTimeout(dispatch(update(), 1000)))
      //   .catch(console.log);
    };