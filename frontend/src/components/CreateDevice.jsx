import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GlobalContext from '../context/GlobalContext';

export default function FormDialog({open, handleClose}) {

  const context = React.useContext(GlobalContext);
  const { CreateDevice, } = context;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const deviceID = formJson.deviceID;
            console.log(deviceID);
            CreateDevice(deviceID);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create a new IOT Device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the Device ID:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="deviceID"
            label="Device ID"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Device</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
