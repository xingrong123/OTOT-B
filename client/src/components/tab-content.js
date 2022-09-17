import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ApiTabs(props) {

  const handleChange = (event, isNameUpdate) => {
    let data = isNameUpdate
      ? { ...props.data, name: event.target.value }
      : { ...props.data, info: event.target.value }
    props.setData(data);
  };

  return (
    <Box>
      <Box>
        <TextField sx={{ m: 2 }} id="name" label="Name" variant="outlined" value={props.data.name} onChange={(ev) => handleChange(ev, true)} />
        {props.hasInfo
          ? <TextField sx={{ m: 2 }} id="info" label="Info" variant="outlined" value={props.data.info} onChange={(ev) => handleChange(ev, false)} />
          : ""
        }
      </Box>
      <Button sx={{ height: '100%', m: 2 }} variant="contained" onClick={props.onClickHandler}>SEND</Button>
    </Box>
  );
}
