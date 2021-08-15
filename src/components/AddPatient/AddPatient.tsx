import React from 'react';
import { Modal, Button, Form, Select, Input, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import patientService, { Location } from '../../services/patientService';

interface AddPatientProps {
  onLoadPatients: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

function getRandomInRange(from: number, to: number, fixed: number) {
  return Number((Math.random() * (to - from) + from).toFixed(fixed));
}

function getRandomLocation() {
  return {
    longitude: getRandomInRange(15, 30, 3),
    latitude: getRandomInRange(15, 30, 3),
  };
}

function populate() {
  for (let i = 0; i < 100; i++) {
    patientService
      .addPatient({
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        gender: 'Male',
        location: getRandomLocation(),
        temperature: 38,
      })
      .then(() => {});
  }
}

const AddPatient = ({
  onLoadPatients,
  onSuccess,
  onError,
}: AddPatientProps) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<Location>();
  const [form] = Form.useForm();

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      const { longitude, latitude } = p.coords;
      setLocation({ longitude, latitude });
    });
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newPatient = {
          ...values,
          location,
        };
        setConfirmLoading(true);
        return patientService.addPatient(newPatient);
      })
      .then(() => {
        setConfirmLoading(false);
        setVisible(false);
        form.resetFields();
        onSuccess('Patient added successfully.');
        onLoadPatients();
      })
      .catch((err) => {
        if (!('errorFields' in err)) {
          setConfirmLoading(false);
          setVisible(false);
          form.resetFields();
          onError('Failed to add patient.');
        }
      });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Patient
      </Button>
      <Modal
        title="Add Patient"
        visible={visible}
        onOk={handleOk}
        okText="Add"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: 'Please input your first name.' },
            ]}
          >
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: 'Please input your last name.' },
            ]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please input your gender.' }]}
          >
            <Select placeholder="Select an option" allowClear>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input your age.' }]}
          >
            <InputNumber placeholder="Age" />
          </Form.Item>
          <Form.Item
            label="Temperature"
            name="temperature"
            rules={[
              { required: true, message: 'Please input your temperature.' },
            ]}
          >
            <InputNumber placeholder="Temperature" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPatient;
