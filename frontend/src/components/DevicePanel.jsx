import { useContext, useEffect } from "react"
import GlobalContext from "../context/GlobalContext";
import Device from "./Device";

const DevicePanel = () => {
    const context = useContext(GlobalContext);
    const { assignedDevices, getDevicesAssignedToCustomer} = context;
    useEffect(()=>{
        getDevicesAssignedToCustomer();
    },[]);
  return (
    <div >
      <h1>Devices assigned to you</h1>
        {
            assignedDevices &&
            assignedDevices.map(device => <div
                                            key={device.device_id}
                                            style={{margin:"4px"}}
                                            >
                                            <Device
                                                id={device._id}
                                                device_id={device.device_id}
                                                state={device.state}
                                                alloted_to_user={device.alloted_to_user}
                                                role="customer"
                                                />
                                            </div>)
        }

    </div>
  )
}

export default DevicePanel
