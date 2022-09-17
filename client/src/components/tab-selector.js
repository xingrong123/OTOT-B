import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { USER_API } from '../apis/user-api';
import Something from './tab-content'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ApiTabs(props) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState({ name: "", info: "" })

  const handleTabChange = (event, tab) => {
    setSelectedTab(tab);
  };

  const [snackbarState, setSnackbarState] = React.useState({
    isOpen: false,
    message: "",
    status: "success"
  });

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, isOpen: false });
  };

  function onClickHandler() {
    let call
    let successMessage = ""
    switch (selectedTab) {
      case 0:
        call = USER_API.get("/", { params: { name: data.name, } })
        break;
      case 1:
        successMessage = `User created`
        call = USER_API.post("/", { name: data.name, info: data.info })
        break;
      case 2:
        successMessage = `User updated`
        call = USER_API.put("/", { name: data.name, info: data.info })
        break;
      case 3:
      default:
        successMessage = `User deleted`
        call = USER_API.delete("/", { data: { name: data.name } })
        break;
    }
    call.then((res) => {
      console.log(res.data.data)
      if (selectedTab === 0) {
        successMessage = `User found: Name: ${res.data.data.name} Info: ${res.data.data.info}`
      } else {
        props.updateTable()
      }
      setSnackbarState({ isOpen: true, message: successMessage, status: "success" })
    })
      .catch(err => {
        console.error(err.response.data.message)
        let errorMessage = String(err.response.data.message)
        setSnackbarState({ isOpen: true, message: errorMessage, status: "error" })
      })
  }


  return (
    <Box sx={{ width: '100%', m: 2 }} minHeight="20vh" >
      <Box display="flex" justifyContent="center" alignItems="center"
        sx={{ borderBottom: 3, borderColor: 'divider' }}
      >
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="GET" {...a11yProps(0)} />
          <Tab label="POST" {...a11yProps(1)} />
          <Tab label="PUT" {...a11yProps(2)} />
          <Tab label="DELETE" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <Something setData={setData} data={data} onClickHandler={onClickHandler} hasInfo={false} />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Something setData={setData} data={data} onClickHandler={onClickHandler} hasInfo={true} />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <Something setData={setData} data={data} onClickHandler={onClickHandler} hasInfo={true} />
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
        <Something setData={setData} data={data} onClickHandler={onClickHandler} hasInfo={false} />
      </TabPanel>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarState.isOpen}
        onClose={handleClose}
        // message={snackbarState.message}
        key={'centercenter'}
        autoHideDuration={3000}>
        <Alert onClose={handleClose} severity={snackbarState.status} sx={{ width: '100%' }}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
