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

    console.log('....****....');

    dispatch({
      type: ADD_RECORD_REQUEST
    });

    const web3 = getState().web3.instance;
    const ipfs = getState().ipfs.api;

    const recordBuffer = Buffer.from(record, 'utf8');

    ipfs.files.add(recordBuffer).then((res) => {
      ContractService.addRecord(web3, patientAddress, res[0].hash).then((err, res) => dispatch(update()));
    }).catch(console.log);

  };