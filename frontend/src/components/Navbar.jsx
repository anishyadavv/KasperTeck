import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link,useNavigate } from 'react-router-dom';
import getLoggedin from '../helper/getLoggedin';
import GlobalContext from '../context/GlobalContext';
export default function NavBar() {
    const context = React.useContext(GlobalContext);
    const { setDevices,setCustomers, setAssignedDevices, setRooms, setUser,setDeviceID} = context;
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setDevices([]);
        setAssignedDevices([]);
        navigate("/adminLogin");
    }
    const loggedIn = getLoggedin();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/adminLogin" style={{color:'white',textDecoration:'none'}}>Kasper Tech</Link>
          </Typography>
          <Button color="inherit" onClick={handleLogout}>{loggedIn?'Logout':''}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}