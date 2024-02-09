import { useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalState = (props) => {
  const [devices, setDevices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [deviceID, setDeviceID] = useState("");
  const [alert,setAlert] = useState({
    title:"",
    status:"",
    show: false,
  });
   const getDeviceData = async() => {
    try{
      const response = await fetch("http://localhost:5000/api/admin/devices");
      const data = await response.json();
      setDevices(data);
    }
    catch(err){
      console.log(err);
    }
  }
  const getCustomers = async() => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/customers");
      const data = await response.json();
      setCustomers(data);
    }catch(err){
      console.log(err);
    }
  }
  const CreateDevice = async(device_id) => {
    try{
      const response = await fetch("http://localhost:5000/api/admin/create-device", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({device_id}),
    });

    const data = await response.json();
    if(data.success){
      console.log(data.newDevice);
      devices.push(data.newDevice);
      setAlert({
              title:"device created successfully",
              status:"success",
              show:"true"
            })
            setTimeout(()=>{
              setAlert({...alert,show:false});
            },2000)
    }
    else{
      setAlert({
        title:data.message,
        status:"error",
        show: true
      })
      setTimeout(()=>{
              setAlert({...alert,show:false});
            },2000)
    }
    }
    catch (err) {
      console.error(err);
    }
  }

  const RegisterCustomer = async(userData) =>{
    const {email, password} = userData;
    try{
      const response = await fetch("http://localhost:5000/api/admin/registerCustomer", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,password}),
    });

    const data = await response.json();
    if(data.success){
      customers.push(email);
      setAlert({
              title:"Customer Registered Successfully",
              status:"success",
              show:"true"
            })
            setTimeout(()=>{
              setAlert({...alert,show:false});
            },2000)
    }
    else{
      setAlert({
        title:data.error,
        status:"error",
        show: true
      })
      setTimeout(()=>{
              setAlert({...alert,show:false});
            },2000)
    }
    }
    catch (err) {
      setAlert({
        title:"Something went wrong",
        status:"error",
        show: true
      })
      setTimeout(()=>{
              setAlert({...alert,show:false});
            },2000)
    }
  }
  const assignDevice = async(CustomerID,DeviceID,handleClose)=>{
    const device_id = DeviceID;
    const user_id = CustomerID;
     try{
      const response = await fetch("http://localhost:5000/api/admin/assign-device", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({device_id,user_id}),
    });

    const data = await response.json();
    if(data.success){
      const updatedDevices = devices.map(device =>{
        if(device.device_id===DeviceID){
          device.alloted_to_user = CustomerID;
          return device;
        }
        return device;
      })
      setDevices(updatedDevices);
      setAlert({
              title:"Device alloted Successfully",
              status:"success",
              show:"true"
            })
            setTimeout(()=>{
              setAlert({...alert,show:false});
            },2000)
    }
    else{
      setAlert({
        title:data.message,
        status:"error",
        show: true
      })
      setTimeout(()=>{
              setAlert({...alert,show:false});
            },2000)
    }
    }
    catch (err) {
      setAlert({
        title:"Something went wrong",
        status:"error",
        show: true
      })
      setTimeout(()=>{
              setAlert({...alert,show:false});
            },2000)
    }
    handleClose();
  }
  const getCustomerDetails = async(user_id)=>{
    try{
      const response = await fetch("http://localhost:5000/api/admin/customer-details", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_id}),
    });
    const data = await response.json();
      return data.email;
    }catch(error){
      setAlert({
        title:"Something went wrong",
        status:"error",
        show: true
      })
      setTimeout(()=>{
              setAlert({...alert,show:false});
            },2000)
    }
    }

  return (
    <GlobalContext.Provider
    value={{
      customers,
      getCustomers,
      devices,
      setDevices,
      getDeviceData,
      CreateDevice,
      alert,
      setAlert,
      RegisterCustomer,
      assignDevice,
      deviceID,
      setDeviceID,
      getCustomerDetails,
    }}>
      {props.children}
    </GlobalContext.Provider>
  );
};


export default GlobalState;