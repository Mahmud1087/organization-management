import { Flex } from 'antd';
import {
  Building2,
  ChartNoAxesColumnDecreasing,
  FileCheck2,
  FileClock,
  FileStack,
  User,
  Users2,
} from 'lucide-react';
import { Card } from '../ui/card';
import { ROLES } from '@/config/constants';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/store/context';
import { useFetchData, useFetchSingleData } from '@/store/queries/common';
import type {
  DeptReturnType,
  LeaveReturnType,
  StaffResultType,
  StaffReturnType,
} from '@/types/dashboard';
import { STAFF_API_URL } from '@/actions/services/api-urls';
import type {
  OwnerAdminAuthDataReturnType,
  StaffAuthDataReturnType,
} from '@/types';
import Loader from './skeleton-loader';

const OverviewCards = () => {
  const { data: user } = useAuthContext();
  const owner = user as OwnerAdminAuthDataReturnType;
  const staff = user as StaffAuthDataReturnType;
  const { data: staffByOrg, isLoading: loadingStaffByOrg } =
    useFetchData<StaffReturnType>(
      `${STAFF_API_URL}org/${owner?.orgId}`,
      user?.role === ROLES.Admin || user?.role === ROLES.Owner
    );
  const { data: staffByDept, isLoading: loadingStaffByDept } =
    useFetchData<StaffReturnType>(
      `${STAFF_API_URL}dept/${staff?.departmentId}`,
      user?.role === ROLES.Manager
    );
  const { data: staffById, isLoading: loadingStaffById } =
    useFetchSingleData<StaffResultType>(
      `${STAFF_API_URL}${staff?.id}`,
      user?.role === ROLES.Manager || user?.role === ROLES.Employee
    );
  const { data: deptByOrg, isLoading: loadingDeptByOrg } =
    useFetchData<DeptReturnType>(
      `${STAFF_API_URL}${owner?.orgId}`,
      user?.role === ROLES.Admin || user?.role === ROLES.Owner
    );
  const { data: leaveById, isLoading: loadingLeaveById } =
    useFetchData<LeaveReturnType>(
      `${STAFF_API_URL}${staff?.id}`,
      user?.role === ROLES.Employee
    );

  const cardData = [
    {
      title: 'Total Staff',
      icon: <ChartNoAxesColumnDecreasing className='size-5' />,
      value: staffByOrg?.data.pagination.total,
      canView: [ROLES.Admin, ROLES.Owner],
    },
    {
      title: 'No. of Managers',
      icon: <User className='size-5' />,
      value: staffByOrg?.data.result.filter((s) => s.role === ROLES.Manager)
        .length,
      canView: [ROLES.Admin, ROLES.Owner],
      bg: '',
    },
    {
      title: 'No. of Employees',
      icon: <Users2 className='size-5' />,
      value: staffByOrg?.data.result.filter((s) => s.role === ROLES.Employee)
        .length,
      canView: [ROLES.Admin, ROLES.Owner],
      bg: '',
    },
    {
      title: 'No. of Employees',
      icon: <Users2 className='size-5' />,
      value: staffByDept?.data.result.filter((s) => s.role === ROLES.Employee)
        .length,
      canView: [ROLES.Manager],
      bg: '',
    },
    {
      title: 'Departments',
      icon: <Building2 className='size-5' />,
      value: deptByOrg?.data.pagination.total,
      canView: [ROLES.Admin, ROLES.Owner],
      bg: '',
    },
    // {
    //   title: 'Leaves Taken',
    //   icon: <FileStack className='size-5' />,
    //   value: 5,
    //   canView: [ROLES.Manager, ROLES.Employee],
    // },
    {
      title: 'Total yearly leave',
      icon: <FileStack className='size-5' />,
      value: staffById?.data.leaveBalance,
      canView: [ROLES.Employee, ROLES.Manager],
      bg: '',
    },
    {
      title: 'Leaves taken this year',
      icon: <FileCheck2 className='size-5' />,
      value: staffById?.data.totalLeavesTaken,
      canView: [ROLES.Employee, ROLES.Manager],
      bg: 'success',
    },
    // {
    //   title: 'Leaves taken 6 month',
    //   icon: <FileClock className='size-5' />,
    //   value: 5,
    //   canView: [ROLES.Employee, ROLES.Manager],
    //   bg: '',
    // },
    {
      title: 'Pending Leave',
      icon: <FileClock className='size-5' />,
      value: leaveById?.data.result.filter((l) => l.status === 'pending')
        .length,
      canView: [ROLES.Employee],
      bg: 'pending',
    },
  ];

  return (
    <>
      <section className='gap-3 flex overflow-x-scroll no-scrollbar xl:grid xl:grid-cols-3'>
        {cardData.map(({ canView, icon, title, bg, value }, index) => {
          return (
            <Card
              key={index}
              className={cn(
                'first:bg-gray-900 group px-5 shadow-none',
                canView.includes(user?.role as string) ? 'block' : 'hidden'
              )}
            >
              <Flex align='center' gap={20} className='w-56 md:w-52'>
                <div
                  className={cn(
                    'h-11 w-11 group-first:bg-primary group-first:text-white rounded-full flex items-center justify-center',
                    bg === 'success'
                      ? 'bg-green-500 text-white'
                      : bg === 'fail'
                        ? 'bg-red-500 text-white'
                        : bg === 'pending'
                          ? 'bg-orange-200'
                          : 'bg-primary/40 text-gray-700'
                  )}
                >
                  {icon}
                </div>

                <Flex vertical gap={6}>
                  <h3 className='group-first:text-white text-gray-600 text-sm font-medium'>
                    {title}
                  </h3>
                  <h2 className='group-first:text-white text-xl font-bold text-gray-600'>
                    {loadingStaffByDept ||
                    loadingStaffByOrg ||
                    loadingDeptByOrg ||
                    loadingLeaveById ||
                    loadingStaffById ? (
                      <Loader />
                    ) : (
                      value
                    )}
                  </h2>
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </section>
    </>
  );
};
export default OverviewCards;
