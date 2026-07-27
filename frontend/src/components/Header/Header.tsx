import { Button, Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { AccessTokenService } from '../AccessTokenService.ts';
const { Header: HeaderAnt } = Layout;
const Header = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (arg0: boolean) => void;
}) => {
  const navigate = useNavigate();

  const accessTokenService = new AccessTokenService();
  const { email, role } = accessTokenService.decodeToken();

  return (
    <HeaderAnt
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      {role === 'ADMIN' || role === 'RECRUITER' ? (
        <Menu
          items={[
            {
              key: 0,
              label: <Link to="/home">Home</Link>,
            },
            {
              key: 1,
              label: <Link to="/attribute">Attributes Library</Link>,
            },
            {
              key: 2,
              label: <Link to="/position">Positions List</Link>,
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
      ) : (
        <div
          style={{
            flex: 1,
            minWidth: 0,
            border: 0,
            backgroundColor: '#ffffff',
          }}
        ></div>
      )}
      {email && (
        <>
          <div>{`Your email: ${email}`}</div>
          <Button
            style={{ marginLeft: '10px' }}
            type="primary"
            onClick={() => {
              accessTokenService.removeToken();
              setIsAuthenticated(false);
              navigate('/');
            }}
          >
            Log out
          </Button>
        </>
      )}
    </HeaderAnt>
  );
};

export default Header;
