import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GlobalContext from '../context/GlobalContext';

export default function Device({id,device_id,state,alloted_to_user,setOpenCustomersModal,role}) {

  const context = React.useContext(GlobalContext);
  const { setDeviceID } = context;
  const handleAllote = (id)=>{
    setOpenCustomersModal(true);
    setDeviceID(id);
  }
  return (
    <>
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
      <Typography variant="h5" component="div">
        Device ID: {device_id}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      {alloted_to_user?` alloted to : ${alloted_to_user}`:"Not alloted"}
      </Typography>
      <Typography variant="h6">
        light: {state.light?"on":"off"}
      </Typography>
       <Typography variant="h6">
        fan: {state.fan?"on":"off"}
      </Typography>
       <Typography variant="h6">
        mis: {state.mis?"on":"off"}
      </Typography>
    </CardContent>
    <CardActions>
      {(role!=="customer")?<Button onClick={()=>handleAllote(id)} size="small">allocate to</Button>:""}
    </CardActions>
      </Card>
    </Box>
    </>
  );
}