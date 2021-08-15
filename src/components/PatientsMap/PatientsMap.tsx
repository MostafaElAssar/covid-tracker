import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { Patient } from '../../services/patientService';

interface PatientsMapProps {
  patients: ReadonlyArray<Patient>;
  onLoadPatients: () => void;
}

const PatientsMap = withScriptjs(
  withGoogleMap(({ onLoadPatients, patients }: PatientsMapProps) => {
    React.useEffect(() => {
      onLoadPatients();
    }, [onLoadPatients]);

    return (
      <GoogleMap defaultZoom={2.5} defaultCenter={{ lat: 0, lng: 0 }}>
        {patients.map(({ location, id }) => (
          <Marker
            key={id}
            position={{ lat: location.latitude, lng: location.longitude }}
          />
        ))}
      </GoogleMap>
    );
  })
);

export default PatientsMap;
