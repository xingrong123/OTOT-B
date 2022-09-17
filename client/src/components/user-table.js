import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function UserTable(props) {

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      description: 'Each user has a unique name.',
      width: 150,
    },
    {
      field: 'info',
      headerName: 'Info',
      width: 300,
    },
  ];

  return (
    <Box sx={{ height: 400, width: '70%', maxWidth: 600, m: 2 }}>
      <DataGrid
        sx={{ borderColor: 'black', }}
        rows={props.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: false }}
      />
    </Box>
  );
}
export default UserTable;