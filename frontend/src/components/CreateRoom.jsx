import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import GlobalContext from '../context/GlobalContext';
import FormControl from '@mui/material/FormControl';

export default function FormDialog({open, handleClose}) {

  const context = React.useContext(GlobalContext);
  const { assignedDevices, createRoom } = context;
  const [deviceID, setDeviceID] = React.useState();
  const [roomID, setRoomID] = React.useState();
  const [roomName, setRoomName] = React.useState();

  const handleChange = (e)=>{
    setDeviceID(e.target.value);
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const data = {
                room_id:roomID,
                room_name:roomName,
                device_id:deviceID
            }
            createRoom(data);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create new Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="roomName"
            label="Room Name"
            type="String"
            fullWidth
            variant="standard"
            value={roomName || ''}
            onChange={(e)=>setRoomName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="roomID"
            label="Room ID"
            type="number"
            fullWidth
            variant="standard"
            value={roomID || ''}
            onChange={(e)=>setRoomID(e.target.value)}
          />
        <FormControl sx={{ mt: 2,minWidth:120 }}>
          <InputLabel id="demo-simple-select-label">Device ID</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={deviceID || ''}
            onChange={handleChange}
            label="Device ID"
            fullWidth
          >
            {assignedDevices && assignedDevices.map(device => <MenuItem key={device._id} value={device._id}>Device Id: {device.device_id}</MenuItem>)}
          </Select>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Room</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
