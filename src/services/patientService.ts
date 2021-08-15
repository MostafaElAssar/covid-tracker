import PatientApi from '../api/PatientApi';

type Response<T> = {
  data: T;
};

export type Location = {
  longitude: number;
  latitude: number;
};

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  location: Location;
};

function addPatient(patient: Omit<Patient, 'id'>): Promise<void> {
  return PatientApi.post('/patients.json', patient);
}

function loadPatients(): Promise<Response<{ [id: string]: Patient }>> {
  return PatientApi.get(`/patients.json`);
}

const patientService = {
  addPatient,
  loadPatients,
};

export default patientService;
