import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First Name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last Name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  { field: 'email', headerName: 'Email', width: 220, editable: true },
  { field: 'role', headerName: 'Role', width: 150, editable: true },
  {
    field: 'fullName',
    headerName: 'Full Name',
    sortable: false,
    width: 180,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', age: 35, email: 'jon@example.com', role: 'Admin' },
  { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 42, email: 'cersei@example.com', role: 'Manager' },
  { id: 3, firstName: 'Jaime', lastName: 'Lannister', age: 45, email: 'jaime@example.com', role: 'Editor' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', age: 16, email: 'arya@example.com', role: 'User' },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', age: 28, email: 'daenerys@example.com', role: 'Admin' },
  { id: 6, firstName: 'Tyrion', lastName: 'Lannister', age: 39, email: 'tyrion@example.com', role: 'User' },
  { id: 7, firstName: 'Sansa', lastName: 'Stark', age: 24, email: 'sansa@example.com', role: 'Manager' },
  { id: 8, firstName: 'Bran', lastName: 'Stark', age: 18, email: 'bran@example.com', role: 'User' },
  { id: 9, firstName: 'Robb', lastName: 'Stark', age: 27, email: 'robb@example.com', role: 'Editor' },
];

function UsersPage() {
  return (
    <Box sx={{ minHeight: '100vh', p: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f1f1f' }}>
          Users
        </Typography>

        <Typography variant="body1" sx={{ color: '#555', mt: 1 }}>
          This page displays the list of users and their details in a table format.
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Users List
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ height: 450, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#fafafa',
                borderBottom: '1px solid #e0e0e0',
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default UsersPage;