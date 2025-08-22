'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-bold text-3xl">Main Dashboard Components will Shown here</h1>
        </div>
      </Box>
    </PageContainer>
  );
}

export default Dashboard;
