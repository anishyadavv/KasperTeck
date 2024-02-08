import { Button, ButtonGroup } from "@mui/material"
import { useEffect } from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";
import useLoggedin from "../hooks/useLoggedin";




const HomePage = () => {
    const navigate = useNavigate();
    const loggedIn = useLoggedin();
    useEffect(()=>{
        if(loggedIn){
            navigate('/adminDashboard');
        }
        else{
            navigate('/')
        }
    },[]);
  return (
    <div>
      <div style={{display:'flex',justifyContent:'center'}}>
       <ButtonGroup variant="contained" aria-label="Basic button group" style={{marginTop:"10px"}}>
            <Link to="/adminSignup"><Button>Admin </Button></Link>
            <Link to="/customerLogin"><Button>Customer</Button></Link>
        </ButtonGroup>
        <div style={{position:"absolute",marginTop:"50px"}}>
             <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default HomePage
