import { Button, Layout, Menu, Switch } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '../AuthContext.tsx';
const { Header: HeaderAnt } = Layout;

const Header = ({
  dark,
  setDark,
}: {
  dark: boolean;
  setDark: (checked: boolean) => void;
}) => {
  const navigate = useNavigate();

  const { email, role } = useUser();
  const { removeToken } = useAuth();

  return (
    <HeaderAnt
      style={{
        display: 'flex',
        alignItems: 'center',
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
          }}
        />
      ) : (
        <div
          style={{
            flex: 1,
            minWidth: 0,
            border: 0,
          }}
        ></div>
      )}
      <Switch
        checked={dark}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
        onChange={setDark}
        style={{ marginRight: 16 }}
      />
      {email && (
        <>
          <div>{`Your email: ${email}`}</div>
          <Button
            style={{ marginLeft: '10px' }}
            type="primary"
            onClick={() => {
              removeToken();
              navigate('/', { replace: true });
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
