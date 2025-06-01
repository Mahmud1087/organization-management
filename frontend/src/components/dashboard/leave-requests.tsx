import DashboardContainer from '@/components/miscelleneous/dashboard-container';
import DashboardHeader from '@/components/miscelleneous/dashboard-header';
import LeaveRequestContainer from '@/container/dashboard/leave-requests';

const LeaveRequests = () => {
  return (
    <DashboardContainer>
      <div className='mt-8 md:mt-6 lg:mt-4'>
        <DashboardHeader
          title='Leave Requests'
          subtitle='Manage leave requests from your staff'
        />
        <div className='mt-6'>
          <LeaveRequestContainer />
        </div>
      </div>
    </DashboardContainer>
  );
};
export default LeaveRequests;
