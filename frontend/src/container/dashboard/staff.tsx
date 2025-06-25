import { ConfirmAction } from '@/components/miscelleneous/confirm-action';
import EditStaff from '@/components/modals/staff/edit-staff';
import { StaffDetails } from '@/components/modals/staff/staff-details';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Table from '@/components/ui/tables/table';
// import { ROLES } from '@/config/constants';
import { useStaffData } from '@/data/staff-data';
import { useDebounce } from '@/hooks';
// import { useAuthContext } from '@/store/context';
import { Dropdown, Flex, type MenuProps } from 'antd';
import { ListFilter, Search } from 'lucide-react';
import { useState } from 'react';

const StaffContainer = () => {
  // const { data: user } = useAuthContext();

  return (
    <div>
      <StaffDetails />
      <EditStaff />
      <ConfirmAction />
      {/* {user?.role === ROLES.Owner || user?.role === ROLES.Admin ? ( */}
      <OwnerAdmin />
      {/* ) : ( */}
      {/* <Staff /> */}
      {/* )} */}
    </div>
  );
};

const OwnerAdmin = () => {
  const { staffColumns, staffData } = useStaffData();

  const [textFilter, setTextFilter] = useState('fullName');
  const [searchText, setSearchText] = useState('');

  const debouncedValue = useDebounce(searchText);

  const filteredData = staffData.filter((staff) => {
    if (!debouncedValue) return true;
    const searchValue = debouncedValue.toLowerCase();
    switch (textFilter) {
      case 'fullName':
        return staff.fullName?.toLowerCase().includes(searchValue);
      case 'role':
        return staff.role?.toLowerCase().includes(searchValue);
      case 'dept':
        return staff.dept?.toLowerCase().includes(searchValue);
      case 'regDate':
        return staff.regDate?.toString().toLowerCase().includes(searchValue);
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
          Full Name
        </p>
      ),
      key: '0',
    },
    {
      label: (
        <p className='text-xs my-1' onClick={() => setTextFilter('role')}>
          Role
        </p>
      ),
      key: '1',
    },
    {
      label: (
        <p className='text-xs my-1' onClick={() => setTextFilter('dept')}>
          Department
        </p>
      ),
      key: '2',
    },
    {
      label: (
        <p className='text-xs my-1' onClick={() => setTextFilter('regDate')}>
          Registration Date
        </p>
      ),
      key: '3',
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
          columns={staffColumns}
          tableCellClass='px-3 md:px-8 py-4 font-inter last:border-b-0'
          tableHeaderClass='bg-[#f7f7f7] text-[#6B7772] py-4 font-inter px-3 md:px-8'
          pagesize={5}
          paginate={false}
        />
      </div>
    </>
  );
};

// const Staff = () => {
//   return <div>Staff</div>;
// };

export default StaffContainer;
