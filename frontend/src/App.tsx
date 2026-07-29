import AppRoutes from './components/AppRoutes.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { App as AntApp, ConfigProvider, theme } from 'antd';
import { AuthProvider } from './components/AuthProvider.tsx';
import { useState } from 'react';

function App() {
  const [dark, setDark] = useState(
    () => localStorage.getItem('theme') === 'dark',
  );

  const handleThemeChange = (checked: boolean) => {
    setDark(checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          components: {
            Layout: {
              headerBg: dark ? 'rgb(20, 20, 20)' : '#fff',
              headerColor: dark ? '#fff' : 'rgb(20, 20, 20)',
            },
          },
        }}
      >
        <AntApp>
          <Router>
            <AppRoutes dark={dark} setDark={handleThemeChange} />
          </Router>
        </AntApp>
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;
