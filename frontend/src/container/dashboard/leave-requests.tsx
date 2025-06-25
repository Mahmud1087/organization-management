import { LeaveDetails } from '@/components/modals/leave-request/leave-details';
import RejectLeaveModal from '@/components/modals/leave-request/reject-leave';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Table from '@/components/ui/tables/table';
// import { ROLES } from '@/config/constants';
import { useLeaveReqData } from '@/data/leave-data';
import { useDebounce } from '@/hooks';
// import { useAuthContext } from '@/store/context';
import { Dropdown, Flex, type MenuProps } from 'antd';
import { ListFilter, Search } from 'lucide-react';
import { useState } from 'react';

const LeaveRequestContainer = () => {
  // const { data: user } = useAuthContext();

  return (
    <div>
      <LeaveDetails />
      <RejectLeaveModal />
      {/* {user?.role === ROLES.Owner || user?.role === ROLES.Admin ? ( */}
      <OwnerAdmin />
      {/* ) : ( */}
      {/* <Staff /> */}
      {/* )} */}
    </div>
  );
};

const OwnerAdmin = () => {
  const { leaveReqData, leaveReqPageColumns } = useLeaveReqData();

  const [textFilter, setTextFilter] = useState('fullName');
  const [searchText, setSearchText] = useState('');

  const debouncedValue = useDebounce(searchText);

  const filteredData = leaveReqData.filter((req) => {
    if (!debouncedValue) return true;
    const searchValue = debouncedValue.toLowerCase();
    switch (textFilter) {
      case 'fullName':
        return req.fullName?.toLowerCase().includes(searchValue);
      case 'department':
        return req.dept?.toLowerCase().includes(searchValue);
      case 'status':
        return req.status.toLowerCase().includes(searchValue);
      default:
        return true;
    }
  });

  const filterItems: MenuProps['items'] = [
    {
      label: (
        <p
          className='text-xs my-1 w-32'
          onClick={() => setTextFilter('fullName')}
        >
          Fullname
        </p>
      ),
      key: '0',
    },
    {
      label: (
        <p className='text-xs my-1' onClick={() => setTextFilter('department')}>
          Department
        </p>
      ),
      key: '1',
    },
    {
      label: (
        <p className='text-xs my-1' onClick={() => setTextFilter('status')}>
          Status
        </p>
      ),
      key: '2',
    },
  ].filter(Boolean);

  return (
    <>
      <div className='bg-white shadow border mt-10 p-5 rounded-lg flex flex-col gap-6'>
        <Flex align='center' justify='space-between'>
          <aside className='relative w-48 lg:w-64'>
            <Input
              className='rounded-full bg-slate-50 placeholder:text-gray-400 text-sm'
              placeholder={`Search by ${textFilter.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className='absolute top-1/2 -translate-y-1/2 right-4 size-5 text-gray-400' />
          </aside>

          <Dropdown
            menu={{ items: filterItems }}
            trigger={['click']}
            placement='bottomLeft'
          >
            <Button variant={'outline'}>
              <ListFilter size={16} />
              <p className='text-sm font-medium text-gray-500'>Filter</p>
            </Button>
          </Dropdown>
        </Flex>
        <hr />
        <Table
          t_data={filteredData}
          columns={leaveReqPageColumns}
          tableCellClass='px-3 md:px-8 py-4 font-inter last:border-b-0'
          tableHeaderClass='bg-[#f7f7f7] text-[#6B7772] py-4 font-inter px-3 md:px-8'
          pagesize={10}
          paginate={leaveReqData.length > 10}
        />
      </div>
    </>
  );
};

// const Staff = () => {
//   return <div>Leave Request</div>;
// };

export default LeaveRequestContainer;
