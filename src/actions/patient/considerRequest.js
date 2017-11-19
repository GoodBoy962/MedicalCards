import {
  CONSIDER_REQUEST,
  CONSIDER_SUCCESS
} from "../../constants/patient/action";
import ContractService from '../../utils/ContractService';

const update = () => ({
  type: CONSIDER_SUCCESS
});

export const consider = (index, decision) =>
  (dispatch, getState) => {

    dispatch({
      type: CONSIDER_REQUEST
    });

    const web3 = getState().web3.instance;

    ContractService.considerRequest(web3, index, decision)
      .then((err, res) => {
        dispatch(update());
      });

  };