import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { useModalContext } from '@/store/context';
import { DEPARTMENT_DETAILS_MODAL } from '../modal-names';
import { Button } from '@/components/ui/button';
import { Flex } from 'antd';
import { Building2 } from 'lucide-react';
import { useDepartmentData } from '@/data/department-data';

export function DepartmentDetails() {
  const { modalState, closeModal, rowId } = useModalContext();
  const { departmentData } = useDepartmentData();
  const department = departmentData.find(
    (department) => department.id === rowId
  );

  return (
    <Dialog open={modalState[DEPARTMENT_DETAILS_MODAL]}>
      <DialogContent className='sm:max-w-[425px]'>
        <div className='flex flex-col items-center mb-2'>
          <Building2 size={50} />
          <p className='font-medium mt-1.5'>{department?.name} Department</p>
        </div>
        <section className='flex flex-col gap-3.5 text-sm border rounded-lg p-4 shadow-sm'>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Total no. of staff</p>
            <p>{department?.totalStaff}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>No. of managers</p>
            <p className='capitalize'>{department?.noOfManagers}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>No. of employees</p>
            <p className='capitalize'>{department?.noOfEmployees}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Registration Date</p>
            <p className='capitalize'>{department?.regDate}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Registered By</p>
            <p className='capitalize bg-primary px-3.5 py-0.5 rounded-full text-white'>
              {department?.createdBy}
            </p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Updated On</p>
            <p className=''>{department?.updatedAt}</p>
          </Flex>
        </section>
        <DialogFooter>
          <Button
            variant={'outline'}
            onClick={() => closeModal(DEPARTMENT_DETAILS_MODAL)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
