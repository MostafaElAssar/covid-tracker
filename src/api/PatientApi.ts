import axios from 'axios';

const PatientApi = axios.create({
  baseURL: 'https://covid-tracker-2d65a-default-rtdb.firebaseio.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default PatientApi;
