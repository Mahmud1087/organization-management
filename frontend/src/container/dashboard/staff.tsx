import DashboardContainer from '@/components/miscelleneous/dashboard-container';
import DashboardHeader from '@/components/miscelleneous/dashboard-header';
import { Button } from '@/components/ui/button';

const Staff = () => {
  return (
    <DashboardContainer>
      <div className='mt-8 md:mt-6 lg:mt-4'>
        <DashboardHeader title='Staff' subtitle='Manage your staff members'>
          <Button>Add Staff</Button>
        </DashboardHeader>
        <div className='mt-6'></div>
      </div>
    </DashboardContainer>
  );
};
export default Staff;
