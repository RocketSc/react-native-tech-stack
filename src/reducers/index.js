import { combineReducers } from 'redux';
import libraries from './libraries';
import selection from './selection';

export default combineReducers({
  libraries,
  selection
});
