import {
  REGISTER_DOCTOR_SUCCESS,
  REGISTER_DOCTOR_REQUEST
} from '../../constants/welcome/actions';
import medCardStorage from '../../rpc/medCardStorage';
import {
  addFile
} from '../../lib/ipfs';

const update = () => ({
  type: REGISTER_DOCTOR_SUCCESS
});

export const register = (name, surname, passport, medClinic, category) =>
  async (dispatch, getState) => {

    dispatch({
      type: REGISTER_DOCTOR_REQUEST
    });

    const privateKey = getState().account.privateKey;
    const profile = await addFile(Buffer.from(JSON.stringify({
      name,
      surname,
      passport,
      medClinic,
      category
    })));
    await medCardStorage.applyDoctor(profile, privateKey);
    dispatch(update());
  }
;