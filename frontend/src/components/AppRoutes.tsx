import { Routes, Route } from 'react-router-dom';
import AttributesLibrary from './AttributesLibrary/AttributesLibrary.tsx';
import Positions from './Positions/PositionsList.tsx';
import Home from './Home/Home.tsx';
import Register from './Register/Register.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/attribute" element={<AttributesLibrary />} />

      <Route path="/position" element={<Positions />} />
      {/*<Route path="*" element={<NotFound />} />*/}
    </Routes>
  );
};

export default AppRoutes;
