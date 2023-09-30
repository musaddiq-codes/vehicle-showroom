import { FETCH_ALL_VEHICLES,  FETCH_ONE_VEHICLE, CREATE_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE } from '../constants/actionTypes';

export default (state = { isLoading: true, vehicles: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL_VEHICLES:
      return {
        ...state,
        vehicles: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_ONE_VEHICLE:
      return { ...state, vehicle: action.payload.vehicle };
    case CREATE_VEHICLE:
      return { ...state, vehicles: [...state.vehicles, action.payload] };
    case UPDATE_VEHICLE:
      return { ...state, vehicles: state.vehicles.map((vehicle) => (vehicle._id === action.payload._id ? action.payload : vehicle)) };
    case DELETE_VEHICLE:
      return { ...state, vehicles: state.vehicles.filter((vehicle) => vehicle._id !== action.payload) };
    default:
      return state;
  }
};

