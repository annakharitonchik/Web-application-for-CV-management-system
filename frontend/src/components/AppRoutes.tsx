import { Routes, Route, Navigate } from 'react-router-dom';
import AttributesLibrary from './AttributesLibrary/AttributesLibrary.tsx';
import Positions from './Positions/PositionsList.tsx';
import Register from './Register/Register.tsx';
import Login from './Login/Login.tsx';
import Home from './Home/Home.tsx';
import { Layout } from 'antd';
import NotFound from './NotFound/NotFound.tsx';
import Header from './Header/Header.tsx';
import Forbidden from './Forbidden/Forbidden.tsx';
import { useUser } from './AuthContext.tsx';

const { Content } = Layout;

const AppRoutes = ({
  dark,
  setDark,
}: {
  dark: boolean;
  setDark: (checked: boolean) => void;
}) => {
  const { role } = useUser();

  const isAuthenticated = !!role;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header dark={dark} setDark={setDark} />
      <Content>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login />
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Register />
            }
          />

          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/" replace />}
          />

          <Route
            path="/attribute"
            element={
              !isAuthenticated ? (
                <Navigate to="/" replace />
              ) : role === 'ADMIN' || role === 'RECRUITER' ? (
                <AttributesLibrary />
              ) : (
                <Navigate to="/forbidden" replace />
              )
            }
          />

          <Route
            path="/position"
            element={
              !isAuthenticated ? (
                <Navigate to="/" replace />
              ) : role === 'ADMIN' || role === 'RECRUITER' ? (
                <Positions />
              ) : (
                <Navigate to="/forbidden" replace />
              )
            }
          />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default AppRoutes;
