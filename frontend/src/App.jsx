import './App.css'
import Navbar from '../src/components/Navbar.jsx';
import Home from '../src/pages/HomePage.jsx';
import AdminDashboard from '../src/pages/AdminDashboard.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminSignup from './pages/AdminSignup.jsx';
import CustomerLogin from './pages/CustomerLogin.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import Alerts from './components/Alerts.jsx';
import { useContext } from 'react';
import GlobalContext from './context/GlobalContext.jsx';
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import DevicePanel from './components/DevicePanel.jsx'
import RoomPanel from './components/RoomPanel.jsx';

function App() {
  const context = useContext(GlobalContext);
  const { alert } = context;

  return (
    <>
    <Router>
      <Navbar/>
       {alert.show && <Alerts alert={alert}/>}
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route path='/adminSignup' element={<AdminSignup/>}></Route>
          <Route path='/adminLogin' element={<AdminLogin/>}></Route>
          <Route path='/customerLogin' element={<CustomerLogin/>}></Route>
        </Route>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/CustomerDashboard' element={<CustomerDashboard/>}>
          <Route path="devices" element={<DevicePanel/>}/>
          <Route path="rooms" element={<RoomPanel/>}/>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
