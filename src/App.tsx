import React from 'react';
import { connect } from 'react-redux';
import { message, Row, Col } from 'antd';
import styled from 'styled-components';
import AddPatient from './components/AddPatient';
import PatientsMap from './components/PatientsMap';
import { loadPatients } from './actions/patientActions';
import style from './App.style';

interface AppProps {
  className?: string;
  onLoadPatients: () => void;
}

const App = ({ className, onLoadPatients }: AppProps) => {
  const onSuccess = (msg: string) => {
    message.success(msg);
  };

  const onError = (msg: string) => {
    message.error(msg);
  };

  return (
    <div className={className}>
      <h1>Covid Tracker</h1>
      <Row justify="end">
        <Col>
          <AddPatient
            onLoadPatients={onLoadPatients}
            onSuccess={onSuccess}
            onError={onError}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <PatientsMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            onLoadPatients={onLoadPatients}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = {
  onLoadPatients: loadPatients,
};

export default connect(
  null,
  mapDispatchToProps
)(
  styled(App)`
    ${style}
  `
);
