import { START_LOADING, END_LOADING, FETCH_ALL_CARS, FETCH_ONE_CAR, CREATE_CAR, UPDATE_CAR, DELETE_CAR } from '../constants/actionTypes';

import * as api from '../api/index.js';


export const getCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_ONE_CAR, payload: { car: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getCars = (page) => async (dispatch) => {
  try {
    console.log(page)
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchCars(page);
    console.log(data)
    dispatch({ type: FETCH_ALL_CARS, payload: { data, currentPage, numberOfPages } });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createCar = (car, history) => async (dispatch) => {
  try {


    dispatch({ type: START_LOADING });
    const { data } = await api.createCar(car);

    dispatch({ type: CREATE_CAR, payload: data });

    // history(`/cars/${data._id}`);
    history(`/dashboard`);

  } catch (error) {
    console.log(error);
  }
};

export const updateCar = (id, car) => async (dispatch) => {
  try {
    const { data } = await api.updateCar(id, car);

    dispatch({ type: UPDATE_CAR, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCar = (id) => async (dispatch) => {
  try {
    await await api.deleteCar(id);

    dispatch({ type: DELETE_CAR, payload: id });
  } catch (error) {
    console.log(error);
  }
};
