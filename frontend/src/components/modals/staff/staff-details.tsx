import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { useModalContext } from '@/store/context';
import { STAFF_DETAILS_MODAL } from '../modal-names';
import { Button } from '@/components/ui/button';
import { Flex } from 'antd';
import { useStaffData } from '@/data/staff-data';

export function StaffDetails() {
  const { modalState, closeModal, rowId } = useModalContext();
  const { staffData } = useStaffData();
  const staff = staffData.find((staff) => staff.id === rowId);

  return (
    <Dialog open={modalState[STAFF_DETAILS_MODAL]}>
      <DialogContent className='sm:max-w-[425px]'>
        {/* <DialogHeader>
          <DialogTitle className='text-sm font-medium'>
            Staff Details
          </DialogTitle>
        </DialogHeader>
        <hr /> */}
        <div className='flex flex-col items-center mb-2'>
          <img
            src='https://i.pravatar.cc/40'
            alt='Profile'
            className='size-12 rounded-full'
          />
          <p className='font-medium mt-1.5'>{staff?.fullName}</p>
          <p className='text-sm italic text-gray-500 font-medium'>
            {staff?.email}
          </p>
        </div>
        <section className='flex flex-col gap-3.5 text-sm border rounded-lg p-4 shadow-sm'>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Address</p>
            <p className='capitalize'>{staff?.address}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Department</p>
            <p>{staff?.dept}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Role</p>
            <p className='capitalize'>{staff?.role}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Phone Number</p>
            <p className='capitalize'>{staff?.phoneNumber}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Registration Date</p>
            <p className='capitalize'>{staff?.regDate}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Registered By</p>
            <p className='capitalize bg-primary px-3.5 py-0.5 rounded-full text-white'>
              {staff?.createdBy}
            </p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Leaves Taken</p>
            <p className=''>{staff?.totalLeaveTaken}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Leave Balance</p>
            <p className=''>{staff?.leaveBalance}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Last Login</p>
            <p className=''>{staff?.lastLogin}</p>
          </Flex>
        </section>
        <DialogFooter>
          <Button
            variant={'outline'}
            onClick={() => closeModal(STAFF_DETAILS_MODAL)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
