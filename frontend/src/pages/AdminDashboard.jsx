import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Device from '../components/Device';
import CreateDevice from '../components/CreateDevice';
import RegisterCustomer from '../components/RegisterCustomer';
import GlobalContext from '../context/GlobalContext';
import Customers from '../components/Customers';
const AdminDashboard = () => {
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
     getDeviceData();
  },[devices])

  return (
    /**
     * register Customer
     * create a new IOT device
     * show list of all devices
     * assign unallocated devices to customer
    **/
    <div style={{padding:"30px 80px"}}>
        <h1>Admin dashboard</h1>
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
        <div>
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
