import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AttributesLibrary from './AttributesLibrary/AttributesLibrary.tsx';
import Positions from './Positions/PositionsList.tsx';
import Register from './Register/Register.tsx';
import Login from './Login/Login.tsx';
import Home from './Home/Home.tsx';
import { Button, Layout, Menu } from 'antd';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
const { Header } = Layout;
interface CustomJwtPayload extends JwtPayload {
  email?: string;
  role?: string;
}
const AppRoutes = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const email =
    (accessToken && jwtDecode<CustomJwtPayload>(accessToken).email) || '';
  const role =
    (accessToken && jwtDecode<CustomJwtPayload>(accessToken).role) || '';

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        {(role === 'ADMIN' || role === 'RECRUITER') && (
          <Menu
            items={[
              {
                key: 0,
                label: <Link to="/Home">Home</Link>,
              },
              {
                key: 1,
                label: <Link to="/attribute">Go to Attributes Library </Link>,
              },
              {
                key: 2,
                label: <Link to="/position">Go to Positions List </Link>,
              },
            ]}
            mode="horizontal"
            style={{
              flex: 1,
              minWidth: 0,
              border: 0,
              backgroundColor: '#ffffff',
            }}
          />
        )}
        {email && (
          <>
            <div>{`Your email: ${email}`}</div>
            <Button
              style={{ marginLeft: '10px' }}
              type="primary"
              onClick={() => {
                localStorage.removeItem('accessToken');
                navigate('/');
              }}

              // loading={loadingDelete}
            >
              Log out
            </Button>
          </>
        )}
      </Header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/attribute" element={<AttributesLibrary />} />

        <Route path="/position" element={<Positions />} />
        {/*<Route path="*" element={<NotFound />} />*/}
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
