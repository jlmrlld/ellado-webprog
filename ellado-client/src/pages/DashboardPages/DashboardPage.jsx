import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent, Paper, Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 180,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DashboardPage() {
  const averageAge = (
    rows.reduce((sum, row) => sum + (row.age || 0), 0) /
    rows.filter((row) => row.age !== null).length
  ).toFixed(1);

  return (
    <Box sx={{ minHeight: '100vh', p: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f1f1f' }}>
          Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mt: 1 }}>
          Overview and summary of users, visual reports, and location information.
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: '1px solid #e0e0e0',
            boxShadow: 'none',
            backgroundColor: '#fff',
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" sx={{ color: '#333', mb: 1 }}>
              Total Users
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#111' }}>
              {rows.length}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: '1px solid #e0e0e0',
            boxShadow: 'none',
            backgroundColor: '#fff',
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" sx={{ color: '#333', mb: 1 }}>
              Average Age
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#111' }}>
              {averageAge}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Quick Metrics
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center">
          <Box sx={{ textAlign: 'center' }}>
            <Gauge width={140} height={140} value={50} />
            <Typography sx={{ mt: 1 }}>Completion Rate</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Gauge width={140} height={140} value={50} valueMin={10} valueMax={60} />
            <Typography sx={{ mt: 1 }}>Performance Index</Typography>
          </Box>
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Paper
          sx={{
            flex: 2,
            p: 3,
            borderRadius: 3,
            border: '1px solid #e0e0e0',
            boxShadow: 'none',
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Quarterly Sales
          </Typography>
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: 'Series 1' },
              { data: [51, 6, 49, 30], label: 'Series 2' },
            ]}
            height={300}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
          />
        </Paper>

        <Paper
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            border: '1px solid #e0e0e0',
            boxShadow: 'none',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Data Distribution
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'Series A' },
                  { id: 1, value: 15, label: 'Series B' },
                  { id: 2, value: 20, label: 'Series C' },
                ],
              },
            ]}
            width={260}
            height={260}
          />
        </Paper>
      </Stack>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Users Overview
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ height: 420, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            experimentalFeatures={{ newEditApi: true }}
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
          Location Map
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            height: 500,
            width: '100%',
            borderRadius: 3,
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
          }}
        >
          <MapContainer
            center={[14.604253, 120.994314]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[14.604253, 120.994314]}>
              <Popup>
                National University-Manila <br />
                <p>
                  <i>551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila</i>
                </p>
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Paper>
    </Box>
  );
}

export default DashboardPage;