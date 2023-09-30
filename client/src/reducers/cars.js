import { FETCH_ALL_CARS,  FETCH_ONE_CAR, CREATE_CAR, UPDATE_CAR, DELETE_CAR } from '../constants/actionTypes';

export default (state = { isLoading: true, cars: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL_CARS:
      return {
        ...state,
        cars: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_ONE_CAR:
      return { ...state, car: action.payload.car };
    case CREATE_CAR:
      return { ...state, cars: [...state.cars, action.payload] };
    case UPDATE_CAR:
      return { ...state, cars: state.cars.map((car) => (car._id === action.payload._id ? action.payload : car)) };
    case DELETE_CAR:
      return { ...state, cars: state.cars.filter((car) => car._id !== action.payload) };
    default:
      return state;
  }
};

