'use client';
import { Paper, Box, Grid } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { DoctorCard } from '../../components/dashboard/DoctorCard';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));


const Shadow = () => {
  return (
    <PageContainer title="Shadow" description="this is Shadow">
      <h1 className="mb-5 font-extrabold text-2xl text-blue-600">Manage your Hospital Doctors</h1>
        <div className="grid md:grid-cols-3 gap-4 sm:grid-cols-2">
          <DoctorCard/>
          <DoctorCard/>
          <DoctorCard/>
          <DoctorCard/>
          <DoctorCard/>
          <DoctorCard/>
          <DoctorCard/>
          <DoctorCard/>
          <DoctorCard/>
        </div>
    </PageContainer>
  );
};

export default Shadow;
