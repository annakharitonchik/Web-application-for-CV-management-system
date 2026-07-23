import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
interface RegisterFormValues {
  email?: string;
  password?: string;
}
const Register: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleRegistration = async (values: RegisterFormValues) => {
    try {
      await axios.post(import.meta.env.VITE_URL + '/user', values);
      messageApi.success('Registration success!');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch {
      messageApi.error('Registration failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100dvh',
        padding: '0 16px',
      }}
    >
      {contextHolder}
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360, width: '100%' }}
        onFinish={handleRegistration}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" type="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item style={{ marginTop: '10%' }}>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
          Have an account? <Link to="/">Log in</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
