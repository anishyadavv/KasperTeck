import { Button, ButtonGroup } from "@mui/material"
import { Link, Outlet} from "react-router-dom";
const CustomerDashboard = () => {

  return (
    /**
     * List af all alloted devices
     * create room and assign device
     * change state of device
     */
    <div style={{padding:"30px 80px"}}>
        <div>
            <h2 style={{textAlign:"center"}}>Customer Dashboard</h2>
            <div style={{display:'flex',justifyContent:'center'}}>
            <ButtonGroup variant="contained" aria-label="Basic button group" style={{marginTop:"10px"}}>
                    <Link to="devices"><Button>Devices</Button></Link>
                    <Link to="rooms"><Button>Rooms</Button></Link>
                </ButtonGroup>
                <div style={{position:"absolute",marginTop:"50px",width:"88%"}}>
                    <Outlet/>
                </div>
        </div>
        </div>
    </div>
  )
}

export default CustomerDashboard
