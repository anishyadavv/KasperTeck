import { useState,useEffect,useContext } from 'react';
import Button from '@mui/material/Button';

import CreateRoom from './CreateRoom';
import GlobalContext from '../context/GlobalContext';
import Room from './Room';
const RoomPanel = () => {
  const [open, setOpen] = useState(false);
  const context = useContext(GlobalContext);
  const {getDevicesAssignedToCustomer,getRooms,rooms} = context;
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
        getRooms();
        getDevicesAssignedToCustomer();
    },[rooms]);
  return (
    <div>
        <div style={{display:'flex', justifyContent:'space-between',alignItems:'center',marginTop:"10px"}}>
            <h3>Rooms</h3>
            <Button onClick={()=>setOpen(true)} variant="outlined">Create Room</Button>
        </div>
        <CreateRoom
        handleClose={handleClose}
        open={open}
        />

        {
            rooms &&
            rooms.map(room =>{
                return <div key={room._id} style={{margin:"10px"}}><Room room_id={room.room_id} room_name={room.room_name} device_id={room.device_id}/></div>
            })
        }
    </div>
  )
}

export default RoomPanel
