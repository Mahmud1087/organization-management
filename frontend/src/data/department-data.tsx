import {
  CONFIRM_ACTION__MODAL,
  EDIT_DEPARTMENT_MODAL,
  DEPARTMENT_DETAILS_MODAL,
} from '@/components/modals/modal-names';
import { useModalContext } from '@/store/context';
import { MoreOutlined } from '@ant-design/icons';
import type { ColumnDef } from '@tanstack/react-table';
import { Dropdown, type MenuProps } from 'antd';

interface DepartmentType {
  id: number;
  name: string;
  regDate: string;
  createdBy: string;
  totalStaff: number;
  noOfEmployees: number;
  noOfManagers: number;
  updatedAt: string;
}
export const useDepartmentData = () => {
  const { setTableRow, openModal, openConfirmActionModal } = useModalContext();

  const deleteDepartment = () => {
    openConfirmActionModal(CONFIRM_ACTION__MODAL, {
      title: 'Delete Department',
      desc: 'Are you sure you want to delete this department?',
      btnText: 'Delete',
      successText: 'Department deleted successfully!',
      action: () => {
        // Logic to delete the department member
        console.log('Department deleted');
      },
      variant: 'destructive',
    });
  };

  const departmentData: DepartmentType[] = [
    {
      id: 1,
      name: 'Frontend',
      regDate: '10 June, 2024 5:30PM',
      createdBy: 'Admin',
      totalStaff: 5,
      noOfEmployees: 3,
      noOfManagers: 2,
      updatedAt: '10 June, 2024 5:30PM',
    },
    {
      id: 2,
      name: 'Backend',
      regDate: '10 June, 2024 5:30PM',
      createdBy: 'Admin',
      totalStaff: 4,
      noOfEmployees: 2,
      noOfManagers: 2,
      updatedAt: '10 June, 2024 5:30PM',
    },
    {
      id: 3,
      name: 'Design',
      regDate: '10 June, 2024 5:30PM',
      createdBy: 'Admin',
      totalStaff: 3,
      noOfEmployees: 1,
      noOfManagers: 2,
      updatedAt: '10 June, 2024 5:30PM',
    },
    {
      id: 4,
      name: 'Marketing',
      regDate: '10 June, 2024 5:30PM',
      createdBy: 'Admin',
      totalStaff: 6,
      noOfEmployees: 4,
      noOfManagers: 2,
      updatedAt: '10 June, 2024 5:30PM',
    },
    {
      id: 6,
      name: 'Sales',
      regDate: '10 June, 2024 5:30PM',
      createdBy: 'Owner',
      totalStaff: 7,
      noOfEmployees: 5,
      noOfManagers: 2,
      updatedAt: '10 June, 2024 5:30PM',
    },
  ];

  const departmentColumns: ColumnDef<DepartmentType>[] = [
    {
      header: () => <p className='table-title font-semibold'>S/N</p>,
      accessorKey: 'id',
      size: 70,
      cell: ({ row }) => (
        <p className='table-item text-black'>{row.index + 1}</p>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'>DEPT. NAME</p>,
      accessorKey: 'name',
      size: 220,
      cell: ({ row }) => (
        <div className='table-item text-black'>{row.original.name}</div>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'>TOTAL STAFF</p>,
      accessorKey: 'totalStaff',
      size: 150,
      cell: ({ row }) => (
        <p className='table-item text-[#6B7772]'>{row.original.totalStaff}</p>
      ),
    },
    {
      header: () => <p className='table-title font-semibold'>REG. DATE</p>,
      accessorKey: 'regDate',
      size: 250,
      cell: ({ row }) => (
        <p className='table-item text-black font-medium'>
          {row.original.regDate}
        </p>
      ),
    },

    {
      header: () => <p className='table-title font-semibold'>REGISTERED BY</p>,
      accessorKey: 'createdBy',
      size: 150,
      cell: ({ row }) => (
        <p className='table-item text-[#6B7772] font-medium'>
          {row.original.createdBy}
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
                onClick={() => {
                  setTableRow(row.original.id);
                  openModal(DEPARTMENT_DETAILS_MODAL);
                }}
                className='text-xs font-medium my-1 w-28'
              >
                View Details
              </p>
            ),
            key: '0',
          },
          {
            label: (
              <p
                onClick={() => {
                  setTableRow(row.original.id);
                  openModal(EDIT_DEPARTMENT_MODAL);
                }}
                className='text-xs my-1 font-medium text-primary'
              >
                Edit Department
              </p>
            ),
            key: '1',
          },
          {
            label: (
              <p
                onClick={() => {
                  setTableRow(row.original.id);
                  deleteDepartment();
                }}
                className='text-xs my-1 font-medium text-red-500'
              >
                Delete Department
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

  return { departmentData, departmentColumns };
};
