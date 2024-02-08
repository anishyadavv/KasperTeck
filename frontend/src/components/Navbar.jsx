import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link,useNavigate } from 'react-router-dom';
import useLoggedin from '../hooks/useLoggedin';

export default function NavBar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }
    const loggedIn = useLoggedin();
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
            <Link to="/" style={{color:'white',textDecoration:'none'}}>Kasper Tech</Link>
          </Typography>
          <Button color="inherit" onClick={handleLogout}>{loggedIn?'Logout':''}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}