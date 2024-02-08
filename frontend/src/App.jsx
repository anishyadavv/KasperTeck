import './App.css'
import Navbar from '../src/components/Navbar.jsx';
import Home from '../src/pages/HomePage.jsx';
import AdminDashboard from '../src/pages/AdminDashboard.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminSignup from './pages/AdminSignup.jsx';
import CustomerLogin from './pages/CustomerLogin.jsx';
import AdminLogin from './pages/AdminLogin.jsx';


function App() {
  

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route path='/adminSignup' element={<AdminSignup/>}></Route>
          <Route path='/adminLogin' element={<AdminLogin/>}></Route>
          <Route path='/customerLogin' element={<CustomerLogin/>}></Route>
        </Route>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
