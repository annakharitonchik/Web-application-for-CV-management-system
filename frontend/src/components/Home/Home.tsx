import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
interface LoginFormValues {
  username?: string;
  password?: string;
}
const Home: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleLogin = async (values: LoginFormValues) => {
    try {
      await axios.post(import.meta.env.VITE_URL + '/auth/login', values);
      messageApi.success('Login successes!');
      setTimeout(() => {
        navigate('/position');
      }, 3000);
    } catch {
      messageApi.error('Login failed');
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
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
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
            Log in
          </Button>
          Don't have an account? <Link to="/register"> Register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Home;
