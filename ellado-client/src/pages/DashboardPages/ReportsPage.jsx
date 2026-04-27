import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

function ReportsPage() {
  return (
    <Box sx={{ minHeight: '100vh', p: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f1f1f' }}>
          Reports
        </Typography>

        <Typography variant="body1" sx={{ color: '#555', mt: 1 }}>
          This page presents charts and data visualizations to help users analyze trends and summary data.
        </Typography>
      </Box>

      <Stack spacing={3}>
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
            Quarterly Performance Report
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
            series={[
              { data: [35, 44, 24, 34], label: 'Series 1' },
              { data: [51, 6, 49, 30], label: 'Series 2' },
            ]}
            height={300}
          />
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
            Monthly Trend Analysis
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <LineChart
            xAxis={[
              {
                scaleType: 'point',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              },
            ]}
            series={[
              { data: [10, 20, 15, 30, 25, 40], label: 'Users' },
              { data: [5, 15, 10, 20, 18, 28], label: 'Activity' },
            ]}
            height={300}
          />
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
            Category Distribution
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'Category A' },
                    { id: 1, value: 15, label: 'Category B' },
                    { id: 2, value: 20, label: 'Category C' },
                    { id: 3, value: 25, label: 'Category D' },
                  ],
                },
              ]}
              width={400}
              height={250}
            />
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

export default ReportsPage;