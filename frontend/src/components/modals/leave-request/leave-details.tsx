import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { useModalContext } from '@/store/context';
import { LEAVE_DETAILS_MODAL, REJECT_LEAVE_MODAL } from '../modal-names';
import { Button } from '@/components/ui/button';
import { Flex } from 'antd';
import { useLeaveReqData } from '@/data/leave-data';

export function LeaveDetails() {
  const { modalState, openModal, closeModal, rowId } = useModalContext();
  const { leaveReqData } = useLeaveReqData();
  const leaveReq = leaveReqData.find((req) => req.id === rowId);

  return (
    <Dialog open={modalState[LEAVE_DETAILS_MODAL]}>
      <DialogContent className='sm:max-w-[425px]'>
        <section className='flex flex-col gap-3.5 text-sm p-4'>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>FUllname</p>
            <p>{leaveReq?.fullName}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Department</p>
            <p className='capitalize'>{leaveReq?.dept}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Role</p>
            <p className='capitalize'>{leaveReq?.role}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>Start Date</p>
            <p className='capitalize'>{leaveReq?.date}</p>
          </Flex>
          <Flex align='center' justify='space-between'>
            <p className='text-gray-600 font-medium'>End Date</p>
            <p className='capitalize'>15 June, 2025 5:30PM</p>
          </Flex>
          <Flex align='center' gap={6} vertical justify='space-between'>
            <p className='text-primary font-medium'>Reason for leave</p>
            <p className='text-center'>{leaveReq?.reason}</p>
          </Flex>
        </section>
        <DialogFooter className='border-t pt-2.5'>
          <Button
            variant={'outline'}
            onClick={() => {
              openModal(REJECT_LEAVE_MODAL);
              closeModal(LEAVE_DETAILS_MODAL);
            }}
            className='bg-red-600 text-white hover:bg-red-500 hover:text-white'
          >
            Reject
          </Button>

          <Button
            variant={'outline'}
            onClick={() => closeModal(LEAVE_DETAILS_MODAL)}
            className='bg-green-600 text-white hover:bg-green-500 hover:text-white'
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
