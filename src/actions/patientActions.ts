import { Action } from 'redux';
import patientService, { Patient } from '../services/patientService';

export const LOAD_PATIENTS_REQUEST = 'LOAD_PATIENTS_REQUEST';
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LOAD_PATIENTS_REQUEST = typeof LOAD_PATIENTS_REQUEST;
export interface LoadPatientsRequestAction extends Action {
  type: LOAD_PATIENTS_REQUEST;
}

export const LOAD_PATIENTS_SUCCESS = 'LOAD_PATIENTS_SUCCESS';
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LOAD_PATIENTS_SUCCESS = typeof LOAD_PATIENTS_SUCCESS;
export interface LoadPatientsSuccessAction extends Action {
  type: LOAD_PATIENTS_SUCCESS;
  payload: ReadonlyArray<Patient>;
}

export const LOAD_PATIENTS_FAILURE = 'LOAD_PATIENTS_FAILURE';
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LOAD_PATIENTS_FAILURE = typeof LOAD_PATIENTS_FAILURE;
export interface LoadPatientsFailureAction extends Action {
  type: LOAD_PATIENTS_FAILURE;
}

export type LoadPatientsActions =
  | LoadPatientsRequestAction
  | LoadPatientsSuccessAction
  | LoadPatientsFailureAction;

export const loadPatients =
  () => (dispatch: (action: LoadPatientsActions) => void) => {
    dispatch({
      type: LOAD_PATIENTS_REQUEST,
    });
    return patientService.loadPatients().then(
      (res) => {
        dispatch({
          type: LOAD_PATIENTS_SUCCESS,
          payload: Object.keys(res?.data ?? {}).map((key) => ({
            ...res.data[key],
            id: key,
          })),
        });
      },
      () => {
        dispatch({
          type: LOAD_PATIENTS_FAILURE,
        });
      }
    );
  };
