import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App as AntApp, Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { type AxiosError } from 'axios';
import { axiosApi } from '../../axios.ts';
import { useAuth } from '../AuthContext.tsx';
interface LoginFormValues {
  email?: string;
  password?: string;
}
const Login = () => {
  const { message } = AntApp.useApp();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const { data } = await axiosApi.post('/auth/login', values);

      message.success('Login success!');
      setToken(data.accessToken);

      navigate('/home');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      message.error(`${axiosError.response?.data?.message}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90dvh',
        padding: '0 16px',
      }}
    >
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360, width: '100%' }}
        onFinish={handleLogin}
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
            Log in
          </Button>
          Don't have an account? <Link to="/register"> Register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
