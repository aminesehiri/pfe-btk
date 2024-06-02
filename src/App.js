import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Firstpageafterlogin from './components/Firstpageafterlogin/Firstpageafterlogin';
import Support from './components/support/Support';
import Demanderuncompte from './components/Demanderuncompte/Demanderuncompte';
import Notification from './components/Notification/Notification';
import Homepage_dashbord from './components/homepage_dashbords/Homepage_dashbord';
import Adddata from './components/adddata/Adddata';
import FirstPageSimpleUser from './components/FirstPageSimpleUser/FirstPageSimpleUser'
import DashbordSimpleUser from './components/dashbordSimpleUser/dashbordSimpleUser';
import Footer from'./components/Footer/Footer';
import { AuthProvider } from './AuthContext'; // Adjust path as necessar
import ProtectedRoute from './ProtectedRoute'; // Adjust path as necessary
import DemandesdeDashboards from './components/DemandesdeDashboards/DemandesdeDashboards'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home isOpen={true} />} />
          <Route path='/Home' element={<Home isOpen={true} />} />
          <Route path='/Login' element={<Login isOpen={true} />} />
          <Route path='/Firstpageafterlogin' element={<ProtectedRoute><Firstpageafterlogin isOpen={true} /></ProtectedRoute>} />
          <Route path='/Support' element={<Support isOpen={true} />} />
          <Route path='/Demanderuncompte' element={<Demanderuncompte isOpen={true} />} />
          <Route path='/Notification' element={<ProtectedRoute><Notification isOpen={true} /></ProtectedRoute>} />
          <Route path='/DashbordSimpleUser' element={<ProtectedRoute><DashbordSimpleUser isOpen={true} /></ProtectedRoute>} />
          <Route path='/Homepage_dashbord' element={<ProtectedRoute><Homepage_dashbord isOpen={true} /></ProtectedRoute>} />
          <Route path='/FirstPageSimpleUser' element={<ProtectedRoute><FirstPageSimpleUser isOpen={true} /></ProtectedRoute>} />
          <Route path='/Adddata' element={<ProtectedRoute><Adddata isOpen={true} /></ProtectedRoute>} />
          <Route path='/DemandesdeDashboards' element={<ProtectedRoute><DemandesdeDashboards isOpen={true} /></ProtectedRoute>} />
        </Routes>
        <Footer/>

      </AuthProvider>
    </Router>
  );
}

export default App;
