import AppRoutes from './components/AppRoutes.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { App as AntApp } from 'antd';
function App() {
  return (
    <AntApp>
      <Router>
        <AppRoutes />
      </Router>
    </AntApp>
  );
}

export default App;
