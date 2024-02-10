import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import Device from '../components/Device';
import CreateDevice from '../components/CreateDevice';
import RegisterCustomer from '../components/RegisterCustomer';
import GlobalContext from '../context/GlobalContext';
import Customers from '../components/Customers';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const context = useContext(GlobalContext);
  const { devices,getDeviceData } = context;
  const [open, setOpen] = useState(false);
  const [openRegisterCustomer, setOpenRegisterCustomer] = useState(false);
  const [openCustomersModal, setOpenCustomersModal] = useState(false);
  const handleCloseCustomersModal = ()=>{
    setOpenCustomersModal(false);
  }
  const handleClickOpenRegistration = ()=>{
    setOpenRegisterCustomer(true);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseRegisterCustomer = ()=>{
    setOpenRegisterCustomer(false);
  }

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/");
    }else{
      getDeviceData();
    }
  },[devices])

  return (
    /**
     * register Customer
     * create a new IOT device
     * show list of all devices
     * assign unallocated devices to customer
    **/
    <div style={{padding:"30px"}}>
        <h2 style={{textAlign:'center'}}>Admin dashboard</h2>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:'24px',flexWrap:'wrap'}}>
          <Button
            variant='contained'
            style={{margin:'4px'}}
            onClick={handleClickOpen}
            >Create New Iot Device</Button>
          <Button
            variant='contained'
            style={{margin:'4px'}}
            onClick={handleClickOpenRegistration}
          >Register New Customer</Button>
        </div>
        <CreateDevice
          handleClose={handleClose}
          open={open}
        />
        <RegisterCustomer
        handleClose={handleCloseRegisterCustomer}
        open={openRegisterCustomer}
        />
        <div style={{marginTop:"20px"}}>
          {devices &&
            devices.map(device => {
              return <div
                        key={device.device_id}
                        style={{margin:"4px"}}
                        >
                          <Device
                            id={device._id}
                            device_id={device.device_id}
                            state={device.state}
                            alloted_to_user={device.alloted_to_user}
                            setOpenCustomersModal={setOpenCustomersModal}
                            />
                      </div>
            }).reverse()
          }
        </div>
        <Customers open={openCustomersModal} handleClose={handleCloseCustomersModal}/>
    </div>
  )
}

export default AdminDashboard
