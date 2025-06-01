import TopStaffs from '@/components/miscelleneous/top-staff';
import ActivityLogs from '@/components/miscelleneous/activity-logs';
import Table from '@/components/ui/tables/table';
import { ROLES } from '@/config/constants';
import { useLeaveReqData } from '@/data/leave-data';
import { useAuthContext } from '@/store/context';
import { Flex } from 'antd';

const Overview = () => {
  const { data: user } = useAuthContext();

  return (
    <div>
      {user?.role === ROLES.Owner || user?.role === ROLES.Admin ? (
        <OwnerAdmin />
      ) : (
        <Staff />
      )}
    </div>
  );
};

const OwnerAdmin = () => {
  const { leaveReqColumns, leaveReqData } = useLeaveReqData();
  const pendingReq = leaveReqData.filter((req) => req.status === 'pending');

  return (
    <div>
      <Flex gap={12} className='flex-col lg:flex-row'>
        <aside className='w-full lg:w-1/2'>
          <TopStaffs />
        </aside>
        <aside className='w-full lg:w-1/2'>
          <ActivityLogs />
        </aside>
      </Flex>
      {/* <Flex>
        <aside></aside>
        <aside></aside>
      </Flex> */}
      <div className='bg-white shadow border mt-10 p-5 rounded-lg'>
        <h1 className='w-full text-primary font-medium mb-5'>
          Pending requests
        </h1>

        <Table
          t_data={pendingReq}
          columns={leaveReqColumns}
          tableCellClass='px-3 md:px-8 py-4 font-inter last:border-b-0'
          tableHeaderClass='bg-[#f7f7f7] text-[#6B7772] py-4 font-inter px-3 md:px-8'
          pagesize={5}
          paginate={false}
        />
      </div>
    </div>
  );
};

const Staff = () => {
  return <div>Staff</div>;
};

export default Overview;
