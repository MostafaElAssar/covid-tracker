import { combineReducers } from 'redux';
import patientReducer from './patientReducer';

export default combineReducers({
  patient: patientReducer,
});
