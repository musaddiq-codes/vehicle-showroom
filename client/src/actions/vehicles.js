import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST,  CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getVehicle = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchVehicle(id);

    dispatch({ type: FETCH_POST, payload: { vehicle: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getVehicles = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createVehicle = (vehicle, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createVehicle(vehicle);

    dispatch({ type: CREATE, payload: data });

    history.push(`/vehicles/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateVehicle = (id, vehicle) => async (dispatch) => {
  try {
    const { data } = await api.updateVehicle(id, vehicle);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const deleteVehicle = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
