import DashboardContainer from '../miscelleneous/dashboard-container';
import Overview from '../../container/dashboard/overview';
import OverviewCards from '../miscelleneous/overview-cards';

const Dashboard = () => {
  return (
    <DashboardContainer>
      <div className='mt-8 md:mt-6 lg:mt-4'>
        <OverviewCards />
        <div className='mt-6'>
          <Overview />
        </div>
      </div>
    </DashboardContainer>
  );
};
export default Dashboard;
