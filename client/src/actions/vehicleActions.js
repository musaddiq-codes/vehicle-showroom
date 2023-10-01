import { START_LOADING, END_LOADING, FETCH_ALL_VEHICLES, FETCH_ONE_VEHICLE, CREATE_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getVehicle = (id) => async (dispatch) => {
  try {


    dispatch({ type: START_LOADING });

    const { data } = await api.fetchVehicle(id);

    dispatch({ type: FETCH_ONE_VEHICLE, payload: { vehicle: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getVehicles = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchVehicles(page);

    dispatch({ type: FETCH_ALL_VEHICLES, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createVehicle = (vehicle, history) => async (dispatch) => {
  try {

    console.log(vehicle)
    dispatch({ type: START_LOADING });
    const { data } = await api.createVehicle(vehicle);

    dispatch({ type: CREATE_VEHICLE, payload: data });

    history(`/dashboard`);
  } catch (error) {
    console.log(error);
  }
};

export const updateVehicle = (id, vehicle) => async (dispatch) => {
  try {
    const { data } = await api.updateVehicle(id, vehicle);

    dispatch({ type: UPDATE_VEHICLE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const deleteVehicle = (id) => async (dispatch) => {
  try {
    await await api.deleteVehicle(id);

    dispatch({ type: DELETE_VEHICLE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
