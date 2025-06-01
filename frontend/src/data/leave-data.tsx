import { LEAVE_DETAILS_MODAL } from '@/components/modals/modal-names';
import { useModalContext } from '@/store/context';
import { MoreOutlined } from '@ant-design/icons';
import type { ColumnDef } from '@tanstack/react-table';
import { Dropdown, type MenuProps } from 'antd';

interface LeaveType {
  id: number;
  fullName: string;
  role: string;
  dept: string;
  date: string;
  reason: string;
  status: string;
}
export const useLeaveReqData = () => {
  const { openModal, setTableRow } = useModalContext();

  const leaveReqData: LeaveType[] = [
    {
      id: 1,
      fullName: 'Carol Person',
      role: 'employee',
      dept: 'Frontend',
      reason:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aperiam odio provident corrupti doloribus pariatur saepe beatae distinctio expedita laborum.',
      date: '10 June, 2024 5:30PM',
      status: 'pending',
    },
    {
      id: 2,
      fullName: 'Hannah Hawkins',
      role: 'employee',
      dept: 'UI/UX',
      reason:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aperiam odio provident corrupti doloribus pariatur saepe beatae distinctio expedita laborum.',
      date: '10 June, 2024 5:30PM',
      status: 'pending',
    },
    {
      id: 3,
      fullName: 'Micheal Stella',
      role: 'employee',
      dept: 'UI/UX',
      reason:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aperiam odio provident corrupti doloribus pariatur saepe beatae distinctio expedita laborum.',
      date: '10 June, 2024 5:30PM',
      status: 'pending',
    },
    {
      id: 4,
      fullName: 'John Jekins',
      role: 'employee',
      dept: 'Backend',
      reason:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aperiam odio provident corrupti doloribus pariatur saepe beatae distinctio expedita laborum.',
      date: '10 June, 2024 5:30PM',
      status: 'rejected',
    },
    {
      id: 6,
      fullName: 'Raquel Holt',
      role: 'manager',
      dept: 'Backend',
      reason:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aperiam odio provident corrupti doloribus pariatur saepe beatae distinctio expedita laborum.',
      date: '10 June, 2024 5:30PM',
      status: 'pending',
    },
    {
      id: 7,
      fullName: 'Hilda Robbins',
      role: 'employee',
      dept: 'Frontend',
      reason:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aperiam odio provident corrupti doloribus pariatur saepe beatae distinctio expedita laborum.',
      date: '10 June, 2024 5:30PM',
      status: 'approved',
    },
    {
      id: 8,
      fullName: 'Jane Doe',
      role: 'manager',
      dept: 'UI/UX',
      reason:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aperiam odio provident corrupti doloribus pariatur saepe beatae distinctio expedita laborum.',
      date: '10 June, 2024 5:30PM',
      status: 'pending',
    },
  ];

  const leaveReqColumns: ColumnDef<LeaveType>[] = [
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
      size: 200,
      cell: ({ row }) => (
        <div className='table-item text-black'>{row.original.fullName}</div>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'>ROLE</p>,
      accessorKey: 'role',
      size: 200,
      cell: ({ row }) => (
        <p className='table-item text-[#6B7772]'>{row.original.role}</p>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'>DEPT</p>,
      accessorKey: 'dept',
      size: 160,
      cell: ({ row }) => (
        <p className='table-item text-black font-medium'>{row.original.dept}</p>
      ),
    },

    {
      header: () => <p className='table-title font-semibold'>DATE</p>,
      accessorKey: 'date',
      size: 250,
      cell: ({ row }) => (
        <p className='table-item text-[#6B7772] font-medium'>
          {row.original.date}
        </p>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'>STATUS</p>,
      accessorKey: 'status',
      size: 80,
      cell: ({ row }) => (
        <p
          className={`text-center text-xs capitalize font-medium px-3 py-1 rounded-full w-full ${
            row.original.status === 'approved'
              ? 'bg-green-100 text-green-800'
              : row.original.status === 'rejected'
                ? 'bg-[#FFCBCB] text-[#B80000]'
                : 'bg-[#FFF5E5] text-[#E8A72D]'
          }`}
        >
          {row.original.status}
        </p>
      ),
    },
  ];

  const leaveReqPageColumns: ColumnDef<LeaveType>[] = [
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
      size: 200,
      cell: ({ row }) => (
        <div className='table-item text-black'>{row.original.fullName}</div>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'>ROLE</p>,
      accessorKey: 'role',
      size: 200,
      cell: ({ row }) => (
        <p className='table-item text-[#6B7772]'>{row.original.role}</p>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'>DEPT</p>,
      accessorKey: 'dept',
      size: 160,
      cell: ({ row }) => (
        <p className='table-item text-black font-medium'>{row.original.dept}</p>
      ),
    },

    {
      header: () => <p className='table-title font-semibold'>DATE</p>,
      accessorKey: 'date',
      size: 250,
      cell: ({ row }) => (
        <p className='table-item text-[#6B7772] font-medium'>
          {row.original.date}
        </p>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'>STATUS</p>,
      accessorKey: 'status',
      size: 80,
      cell: ({ row }) => (
        <p
          className={`text-center text-xs capitalize font-medium px-3 py-1 rounded-full w-full ${
            row.original.status === 'approved'
              ? 'bg-green-100 text-green-600'
              : row.original.status === 'rejected'
                ? 'bg-red-100 text-red-600'
                : 'bg-yellow-100 text-yellow-600'
          }`}
        >
          {row.original.status}
        </p>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'></p>,
      id: 'action',
      size: 50,
      cell: ({ row }) => {
        // const status = row.original.status;

        const items: MenuProps['items'] = [
          {
            label: (
              <p
                // onClick={() => {
                //   setTableRow(row.original.id);
                //   openModal(EDIT_DEPARTMENT_MODAL);
                // }}
                className='text-xs my-1 font-medium text-green-500'
              >
                Approve
              </p>
            ),
            key: '0',
          },
          {
            label: (
              <p
                // onClick={() => {
                //   setTableRow(row.original.id);
                //   openModal(EDIT_DEPARTMENT_MODAL);
                // }}
                className='text-xs my-1 font-medium text-red-500'
              >
                Reject
              </p>
            ),
            key: '1',
          },
          {
            label: (
              <p
                onClick={() => {
                  setTableRow(row.original.id);
                  openModal(LEAVE_DETAILS_MODAL);
                }}
                className='text-xs font-medium my-1 w-28'
              >
                View Details
              </p>
            ),
            key: '2',
          },
        ].filter(Boolean);

        return (
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement='bottomRight'
          >
            <p className='text-[#6B7772] text-end w-full'>
              <MoreOutlined className='cursor-pointer text-lg' />
            </p>
          </Dropdown>
        );
      },
    },
  ];

  return { leaveReqData, leaveReqColumns, leaveReqPageColumns };
};
