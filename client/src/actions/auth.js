import { LOGIN, SIGNUP } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: LOGIN, data });

    router('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {

    console.log(formData)
    const { data } = await api.signUp(formData);

    dispatch({ type: SIGNUP, data });
    if (data) {
      router('/dashboard');
    }
  } catch (error) {
    console.log(error);
  }
};
