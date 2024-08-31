import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Cows from './pages/Cows';
import MilkProduction from './pages/MilkProduction';
import MedicalCheckups from './pages/MedicalCheckups';
import Births from './pages/Births';
import Layout from './Layouts/Layout';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Details from './pages/Details';
import Users from './pages/Users';
import AuthWrapper from './components/Auth/AuthWrapper';
import useAuth from './hooks/useAuth';
import Fallback from './components/Auth/Fallback';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/' element={user ? <Layout /> : <Fallback />}>
          <Route index element={<Dashboard />} />
          <Route
            path='/users'
            element={
              <AuthWrapper>
                <Users />
              </AuthWrapper>
            }
          />
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
