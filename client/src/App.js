import './App.css';
import UserTable from './components/user-table';
import React, { useEffect, useState } from 'react';
import { USER_API } from './apis/user-api'
import Tabs from './components/tab-selector'

function App() {

  const [rows, setRows] = useState([])

  function updateTable() {
    USER_API
      .get("/all")
      .then((res) => {
        let renamedData = res.data.data.map(el => ({ id: el._id, ...el }))
        console.log(renamedData)
        setRows(renamedData)
      })
      .catch(err => console.error(err.response))
  }

  useEffect(() => {
    updateTable()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        OTOT B3. Done by Tey Xing Rong
      </header>
      <div className="App-body">
        <Tabs updateTable={updateTable} />
        <UserTable rows={rows} />
      </div>
    </div>
  );
}

export default App;
