import DashboardContainer from '@/components/miscelleneous/dashboard-container';
import DashboardHeader from '@/components/miscelleneous/dashboard-header';
import { Button } from '@/components/ui/button';
import { useModalContext } from '@/store/context';
import AddDepartment from '../modals/department/add-department';
import { ADD_DEPARTMENT_MODAL } from '../modals/modal-names';
import DepartmentContainer from '@/container/dashboard/department';

const Department = () => {
  const { openModal } = useModalContext();

  return (
    <DashboardContainer>
      <AddDepartment />

      <div className='mt-8 md:mt-6 lg:mt-4'>
        <DashboardHeader
          title='Department'
          subtitle='Manage your department members'
        >
          <Button onClick={() => openModal(ADD_DEPARTMENT_MODAL)}>
            Add Department
          </Button>
        </DashboardHeader>
        <div className='mt-6'>
          <DepartmentContainer />
        </div>
      </div>
    </DashboardContainer>
  );
};
export default Department;
