import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function CurrencyTable(props) {

  const columns = [
    {
      field: 'Country/Territory',
      headerName: 'Country/Territory',
      width: 250,
    },
    {
      field: 'Currency',
      headerName: 'Currency',
      width: 150,
    },
    {
      field: 'Currency code',
      headerName: 'Currency code',
      width: 120,
    },
    {
      field: 'rate',
      headerName: 'Rate',
      width: 120,
    },
  ];

  return (
    <Box sx={{ height: 650, width: '70%', maxWidth: 700, m: 2 }}>
      <DataGrid
        sx={{ borderColor: 'black', }}
        rows={props.rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: false }}
      />
    </Box>
  );
}
export default CurrencyTable;