import {
  REGISTER_DOCTOR_SUCCESS,
  REGISTER_DOCTOR_REQUEST
} from '../../constants/welcome/actions';
import medCardStorage from '../../rpc/medCardStorage';

const update = () => ({
  type: REGISTER_DOCTOR_SUCCESS
});

export const register = (name, surname, passport, medClinic, category) =>
  async function (dispatch, getState) {

    dispatch({
      type: REGISTER_DOCTOR_REQUEST
    });

    const privateKey = getState().account.privateKey;
    const ipfs = getState().ipfs.instance;

    const files =
      await ipfs.files.add(Buffer
        .from(JSON.stringify({
          name,
          surname,
          passport,
          medClinic,
          category
        })));
    const profile = files[0].hash;
    await medCardStorage.applyDoctor(profile, privateKey);
    dispatch(update());
  }
;