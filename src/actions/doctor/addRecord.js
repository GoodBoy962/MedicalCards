import {
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS
} from "../../constants/doctor/action";
import ContractService from '../../utils/ContractService';

export const update = () => ({
  type: ADD_RECORD_SUCCESS
});

export const add = (patientAddress, record) =>
  (dispatch, getState) => {

    dispatch({
      type: ADD_RECORD_REQUEST
    });

    const web3 = getState().web3.instance;
    const ipfs = getState().ipfs.api;

    const recordBuffer = Buffer.from(record, 'utf8');

    ipfs.files.add(recordBuffer, (err, files) => {
      ContractService.addRecord(web3, patientAddress, files[0].hash).then((err, res) => dispatch(update()));
    }).catch(console.log);

  };