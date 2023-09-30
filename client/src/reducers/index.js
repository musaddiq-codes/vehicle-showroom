import { combineReducers } from 'redux';

import cars from './cars';
import vehicles from './vehicles';
import auth from './auth';

export const reducers = combineReducers({ cars, auth, vehicles });
