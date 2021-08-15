import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { Patient } from '../../services/patientService';
import distanceUtil from '../../utils/distanceUtil';
import marker from './marker.png';

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
        {patients.map(({ location, id }) => {
          if (
            patients.filter(
              (p) => distanceUtil.calculateDistance(p.location, location) < 100
            ).length > 10
          ) {
            return (
              <Marker
                key={id}
                position={{ lat: location.latitude, lng: location.longitude }}
              />
            );
          }

          return (
            <Marker
              key={id}
              position={{ lat: location.latitude, lng: location.longitude }}
              icon={{
                url: marker,
                anchor: new google.maps.Point(17, 46),
                scaledSize: new google.maps.Size(37, 37),
              }}
            />
          );
        })}
      </GoogleMap>
    );
  })
);

export default PatientsMap;
