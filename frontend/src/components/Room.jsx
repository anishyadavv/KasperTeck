import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FormControlLabel, Switch, Button } from '@mui/material';

import GlobalContext from '../context/GlobalContext';


export default function Room({room_name,room_id,device_id}) {
    const context = React.useContext(GlobalContext);
    const {alert, setAlert} = context;
    const [device, setDevice] = React.useState({});
    const [lightState, setLightState] = React.useState(false);
    const [fanState, setFanState] = React.useState(false);
    const [miscState, setMiscState] = React.useState(false);

    const handleControlDevice = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/customer/control-device",
                {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        device_id: device._id,
                        light: lightState ? 1 : 0,
                        fan: fanState ? 1 : 0,
                        mis: miscState ? 1 : 0
                    }),
                    }
                )

                const data = await response.json();
                 if(data.success){
                        setAlert({
                                title:"state changed successfully",
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
                } catch (error) {
                    console.error('Error updating device state:', error);
                }
    };
    React.useEffect(()=>{
        const getDevice = async()=>{
            try{
                const response = await fetch("http://localhost:5000/api/customer/single-device",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    },
                    body: JSON.stringify({device_id}),
                    }
                )
                const data = await response.json();
                setDevice(data);
                setLightState((data.state.light===1)?true:false);
                setFanState((data.state.fan===1)?true:false);
                setMiscState((data.state.mis===1)?true:false)
            }
            catch(e){
                console.log(e.message);
            }
        }
        getDevice();
    },[])
  return (
    <>
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
      <Typography variant="h5" component="div">
        Room Name: {room_name}
      </Typography>
      <Typography variant="h6">
        Room ID: {room_id}
      </Typography>
      <Typography variant="h6">
        Device Assigned: {device.device_id}
      </Typography>
      <Typography variant="h6">
      </Typography>
      <div>
      <FormControlLabel
        control={<Switch checked={lightState} onChange={() => setLightState(prevState => !prevState)} />}
        label="Light"
      />
      <FormControlLabel
        control={<Switch checked={fanState} onChange={() => setFanState(prevState => !prevState)} />}
        label="Fan"
      />
      <FormControlLabel
        control={<Switch checked={miscState} onChange={() => setMiscState(prevState => !prevState)} />}
        label="Misc"
      />
      <Button onClick={handleControlDevice} variant="contained" color="primary">Update Device</Button>
    </div>
    </CardContent>
      </Card>
    </Box>
    </>
  );
}