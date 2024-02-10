import { Button, ButtonGroup } from "@mui/material"
import { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import getLoggedin from "../helper/getLoggedin";
import GlobalContext from "../context/GlobalContext";



const HomePage = () => {
    const navigate = useNavigate();
    const loggedIn = getLoggedin();
    const context = useContext(GlobalContext);
    const { user } = context;
    useEffect(()=>{
        if(loggedIn){
          (user.role==="admin")?
            navigate('/adminDashboard'):
            navigate('/CustomerDashboard/devices');
        }
        else{
            navigate('/adminLogin')
        }
    },[]);
  return (
    <div>
      <div style={{display:'flex',justifyContent:'center'}}>
       <ButtonGroup variant="contained" aria-label="Basic button group" style={{marginTop:"10px"}}>
            <Link to="/adminLogin"><Button>Admin </Button></Link>
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
