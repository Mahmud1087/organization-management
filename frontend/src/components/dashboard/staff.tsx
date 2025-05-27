import DashboardContainer from '@/components/miscelleneous/dashboard-container';
import DashboardHeader from '@/components/miscelleneous/dashboard-header';
import { Button } from '@/components/ui/button';
import StaffContainer from '@/container/dashboard/staff';
import { useModalContext } from '@/store/context';
import { ADD_STAFF_MODAL } from '../modals/modal-names';
import AddStaff from '../modals/staff/add-staff';

const Staff = () => {
  const { openModal } = useModalContext();

  return (
    <DashboardContainer>
      <AddStaff />

      <div className='mt-8 md:mt-6 lg:mt-4'>
        <DashboardHeader title='Staff' subtitle='Manage your staff members'>
          <Button onClick={() => openModal(ADD_STAFF_MODAL)}>Add Staff</Button>
        </DashboardHeader>
        <div className='mt-6'>
          <StaffContainer />
        </div>
      </div>
    </DashboardContainer>
  );
};
export default Staff;
