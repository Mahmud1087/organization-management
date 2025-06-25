import {
  CONFIRM_ACTION__MODAL,
  EDIT_STAFF_MODAL,
  STAFF_DETAILS_MODAL,
} from '@/components/modals/modal-names';
import { ROLES } from '@/config/constants';
import { cn } from '@/lib/utils';
import { useAuthContext, useModalContext } from '@/store/context';
import { MoreOutlined } from '@ant-design/icons';
import type { ColumnDef } from '@tanstack/react-table';
import { Flex, Popover } from 'antd';

interface StaffType {
  id: number;
  fullName: string;
  role: string;
  dept: string;
  regDate: string;
  email: string;
  phoneNumber: string;
  address: string;
  totalLeaveTaken: number;
  leaveBalance: number;
  lastLogin: string;
  createdBy: string;
}
export const useStaffData = () => {
  const { setTableRow, openModal, openConfirmActionModal } = useModalContext();
  const { data: user } = useAuthContext();
  const isManagement = user?.role === ROLES.Admin || user?.role === ROLES.Admin;

  const deleteStaff = () => {
    openConfirmActionModal(CONFIRM_ACTION__MODAL, {
      title: 'Delete Staff',
      desc: 'Are you sure you want to delete this staff?',
      btnText: 'Delete',
      successText: 'Staff deleted successfully!',
      action: () => {
        // Logic to delete the staff member
        console.log('Staff member deleted');
      },
      variant: 'destructive',
    });
  };

  const staffData: StaffType[] = [
    {
      id: 1,
      fullName: 'Carol Person',
      role: 'employee',
      dept: 'Frontend',
      regDate: '10 June, 2024 5:30PM',
      email: 'joel@mailinator.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, City, Country',
      totalLeaveTaken: 5,
      leaveBalance: 15,
      lastLogin: '10 June, 2024 5:30PM',
      createdBy: 'Admin',
    },
    {
      id: 2,
      fullName: 'Hannah Hawkins',
      role: 'employee',
      dept: 'UI/UX',
      regDate: '10 June, 2024 5:30PM',
      email: 'jane@mailinator.com',
      phoneNumber: '987-654-3210',
      address: '456 Elm St, City, Country',
      totalLeaveTaken: 3,
      leaveBalance: 12,
      lastLogin: '10 June, 2024 5:30PM',
      createdBy: 'Owner',
    },
    {
      id: 3,
      fullName: 'Micheal Stella',
      role: 'employee',
      dept: 'UI/UX',
      regDate: '10 June, 2024 5:30PM',
      email: 'john@mailinator.com',
      phoneNumber: '555-123-4567',
      address: '789 Oak St, City, Country',
      totalLeaveTaken: 2,
      leaveBalance: 18,
      lastLogin: '10 June, 2024 5:30PM',
      createdBy: 'Admin',
    },
    {
      id: 4,
      fullName: 'John Jekins',
      role: 'employee',
      dept: 'Backend',
      regDate: '10 June, 2024 5:30PM',
      email: 'mudi@mailinator.com',
      phoneNumber: '321-654-9870',
      address: '321 Pine St, City, Country',
      totalLeaveTaken: 4,
      leaveBalance: 16,
      lastLogin: '10 June, 2024 5:30PM',
      createdBy: 'Admin',
    },
    {
      id: 6,
      fullName: 'Raquel Holt',
      role: 'manager',
      dept: 'Backend',
      regDate: '10 June, 2024 5:30PM',
      email: 'mudi@mailinator.com',
      phoneNumber: '321-654-9870',
      address: '321 Pine St, City, Country',
      totalLeaveTaken: 4,
      leaveBalance: 16,
      lastLogin: '10 June, 2024 5:30PM',
      createdBy: 'Admin',
    },
  ];

  const staffColumns: ColumnDef<StaffType>[] = [
    {
      header: () => <p className='table-title font-semibold'>S/N</p>,
      accessorKey: 'id',
      size: 70,
      cell: ({ row }) => (
        <p className='table-item text-black'>{row.index + 1}</p>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'>FULL NAME</p>,
      accessorKey: 'fullName',
      size: isManagement ? 200 : 300,
      cell: ({ row }) => (
        <div className='table-item text-black'>{row.original.fullName}</div>
      ),
    },
    {
      header: () => (
        <p
          className={cn(
            'table-title font-semibold'
            // isManagement ? 'block' : 'hidden'
          )}
        >
          ROLE
        </p>
      ),
      accessorKey: 'role',
      size: 200,
      cell: ({ row }) => (
        <p
          className={cn(
            'table-item text-[#6B7772]'
            // isManagement ? 'block' : 'hidden'
          )}
        >
          {row.original.role}
        </p>
      ),
    },
    {
      header: () => (
        <p
          className={cn(
            'table-title font-semibold',
            isManagement ? 'block' : 'hidden'
          )}
        >
          DEPT
        </p>
      ),
      accessorKey: 'dept',
      size: 160,
      cell: ({ row }) => (
        <p
          className={cn(
            'table-item text-black font-medium',
            isManagement ? 'block' : 'hidden'
          )}
        >
          {row.original.dept}
        </p>
      ),
    },

    {
      header: () => <p className='table-title font-semibold'>REG DATE</p>,
      accessorKey: 'regDate',
      size: 200,
      cell: ({ row }) => (
        <p className='table-item text-[#6B7772] font-medium'>
          {row.original.regDate}
        </p>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'></p>,
      id: 'action',
      size: 50,
      cell: ({ row }) => {
        // const status = row.original.status;

        const content = (
          <Flex vertical gap={5}>
            <p
              onClick={() => {
                setTableRow(row.original.id);
                openModal(STAFF_DETAILS_MODAL);
              }}
              className='text-xs font-medium py-1.5 transition-all px-2.5 hover:bg-gray-200 hover:rounded cursor-pointer w-28'
            >
              View Details
            </p>

            {isManagement && (
              <p
                onClick={() => {
                  setTableRow(row.original.id);
                  openModal(EDIT_STAFF_MODAL);
                }}
                className='text-xs py-1.5 transition-all px-2.5 hover:bg-gray-200 hover:rounded cursor-pointer font-medium text-primary'
              >
                Edit Staff
              </p>
            )}

            {isManagement && (
              <p
                onClick={() => {
                  setTableRow(row.original.id);
                  deleteStaff();
                }}
                className='text-xs py-1.5 transition-all px-2.5 hover:bg-gray-200 hover:rounded cursor-pointer font-medium text-red-500'
              >
                Delete Staff
              </p>
            )}
          </Flex>
        );

        return (
          <Popover trigger={'click'} placement='bottomRight' content={content}>
            <p className='text-[#6B7772] text-end w-full'>
              <MoreOutlined className='cursor-pointer text-lg' />
            </p>
          </Popover>
        );
      },
    },
  ];

  return { staffData, staffColumns };
};
