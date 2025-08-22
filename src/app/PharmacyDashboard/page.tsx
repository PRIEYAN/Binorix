'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/PharmacyDashboard/components/container/PageContainer';
import SalesOverview from '@/app/PharmacyDashboard/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/PharmacyDashboard/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/PharmacyDashboard/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/PharmacyDashboard/components/dashboard/ProductPerformance';
import Blog from '@/app/PharmacyDashboard/components/dashboard/Blog';
import MonthlyEarnings from '@/app/PharmacyDashboard/components/dashboard/MonthlyEarnings';

const PharmacyDashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 8
            }}>
            <SalesOverview />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <YearlyBreakup />
              </Grid>
              <Grid size={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
            <RecentTransactions />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 8
            }}>
            <ProductPerformance />
          </Grid>
          <Grid size={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default PharmacyDashboard;
