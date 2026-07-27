import { Routes, Route, Navigate } from 'react-router-dom';
import AttributesLibrary from './AttributesLibrary/AttributesLibrary.tsx';
import Positions from './Positions/PositionsList.tsx';
import Register from './Register/Register.tsx';
import Login from './Login/Login.tsx';
import Home from './Home/Home.tsx';
import { Layout } from 'antd';
import NotFound from './NotFound/NotFound.tsx';
import Header from './Header/Header.tsx';
import { AccessTokenService } from './AccessTokenService.ts';
import Forbidden from './Forbidden/Forbidden.tsx';
import { useState } from 'react';

const { Content } = Layout;

const AppRoutes = () => {
  const accessTokenService = new AccessTokenService();
  const { role } = accessTokenService.decodeToken();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!accessTokenService.getToken(),
  );

  return (
    <Layout>
      <Header setIsAuthenticated={setIsAuthenticated} />
      <Content>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Register />
            }
          />

          <Route path="/home" element={<Home />} />

          <Route
            path="/attribute"
            element={
              role !== 'ADMIN' && role !== 'RECRUITER' ? (
                <Navigate to="/forbidden" replace />
              ) : (
                <AttributesLibrary />
              )
            }
          />

          <Route
            path="/position"
            element={
              role !== 'ADMIN' && role !== 'RECRUITER' ? (
                <Navigate to="/forbidden" replace />
              ) : (
                <Positions />
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
