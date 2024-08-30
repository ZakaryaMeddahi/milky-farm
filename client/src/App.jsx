import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Cows from './pages/Cows';
import MilkProduction from './pages/MilkProduction';
import MedicalCheckups from './pages/MedicalCheckups';
import Births from './pages/Births';
import Layout from './Layouts/Layout';
import Login from './pages/Login';
import Details from './pages/Details';

const App = () => {
  const user = { name: 'Zakarya Meddahi' }; // This would come from your auth system
  const handleLogout = () => {
    // Implement logout logic here
  };

  return (
    <Router>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route
          path='/'
          element={<Layout user={user} onLogout={handleLogout} />}
        >
          <Route index element={<Dashboard />} />
          <Route path='/cows' element={<Cows />} />
          <Route path='/milk-production' element={<MilkProduction />} />
          <Route path='/medical-checkups' element={<MedicalCheckups />} />
          <Route path='/births' element={<Births />} />
          <Route path='/cow-details/:id' element={<Details />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
