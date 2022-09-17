import './App.css';
import UserTable from './components/user-table';
import React, { useEffect, useState } from 'react';
import { USER_API } from './apis/user-api'
import Tabs from './components/tab-selector'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import CurrencyTable from './components/currency-table';
import { SERVERLESS_API } from './apis/serverless-api';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';

function App() {

  const [rows, setRows] = useState([])
  const [isServerless, setIsServerless] = useState(false)

  const [currencyRows, setCurrencyRows] = useState([])

  function updateTable() {
    USER_API
      .get("/all")
      .then((res) => {
        let renamedData = res.data.data.map(el => ({ id: el._id, ...el }))
        setRows(renamedData)
      })
      .catch(err => console.error(err.response))
  }

  function callServerlessApi() {
    SERVERLESS_API
    .get("/")
    .then((res) => {
      setCurrencyRows(res.data)
    })
    .catch(err => console.error(err.response))
  }

  function onClick() {
    if (!isServerless) {
      callServerlessApi()
    }
    setIsServerless(!isServerless)
  }

  useEffect(() => {
    updateTable()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="fixed" sx={{ p: 1, background: '#2E3B55' }} >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              OTOT B3. Done by Tey Xing Rong
            </Typography>
            <Button variant="contained" onClick={onClick}>{isServerless ? "web app" : "serverless"}</Button>
          </Toolbar>
        </AppBar>
      </header>
      <div className="App-body">
        {isServerless
          ? <><h4>Asian Currencies</h4><IconButton onClick={() => callServerlessApi()}><RefreshIcon></RefreshIcon></IconButton><CurrencyTable rows={currencyRows}></CurrencyTable></>
          : <><Tabs updateTable={updateTable} /><UserTable rows={rows} /></>
        }
      </div>
    </div>
  );
}

export default App;
