import AppRoutes from './components/AppRoutes.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { App as AntApp } from 'antd';
import { AuthProvider } from './components/AuthProvider.tsx';

function App() {
  return (
    <AuthProvider>
      <AntApp>
        <Router>
          <AppRoutes />
        </Router>
      </AntApp>
    </AuthProvider>
  );
}

export default App;
