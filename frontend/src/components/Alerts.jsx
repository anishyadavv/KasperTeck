import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function Alerts({alert}) {
  return (
    <div style={{margin:'auto'}}>
        <Alert severity={alert.status}>
        {alert.title}
      </Alert>
    </div>
  );
}
