import {
  LoadPatientsActions,
  LOAD_PATIENTS_REQUEST,
  LOAD_PATIENTS_SUCCESS,
  LOAD_PATIENTS_FAILURE,
} from '../actions/patientActions';
import { Patient } from '../services/patientService';

export type PatientState = {
  patients: ReadonlyArray<Patient>;
  loading: boolean;
};

const initialState: PatientState = {
  patients: [],
  loading: false,
};

const patientReducer = (
  state: PatientState = initialState,
  action: LoadPatientsActions
) => {
  switch (action.type) {
    case LOAD_PATIENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_PATIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: action.payload,
      };
    case LOAD_PATIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        patients: [],
      };
    default:
      return state;
  }
};

export default patientReducer;
