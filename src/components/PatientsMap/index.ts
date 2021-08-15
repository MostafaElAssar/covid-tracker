import { connect } from 'react-redux';
import PatientsMap from './PatientsMap';
import { PatientState } from '../../reducers/patientReducer';

const mapStateToProps = (state: { patient: PatientState }) => ({
  patients: state.patient.patients,
});

export default connect(mapStateToProps)(PatientsMap);
