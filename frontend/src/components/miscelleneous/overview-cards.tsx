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

const OverviewCards = () => {
  const { data: user } = useAuthContext();

  const cardData = [
    {
      title: 'Total Staff',
      icon: <ChartNoAxesColumnDecreasing className='size-5' />,
      value: 55,
      canView: [ROLES.Admin, ROLES.Owner],
    },
    {
      title: 'No. of Managers',
      icon: <User className='size-5' />,
      value: 5,
      canView: [ROLES.Admin, ROLES.Owner],
      bg: '',
    },
    {
      title: 'No. of Employees',
      icon: <Users2 className='size-5' />,
      value: 12,
      canView: [ROLES.Admin, ROLES.Owner, ROLES.Manager],
      bg: '',
    },
    {
      title: 'Departments',
      icon: <Building2 className='size-5' />,
      value: 5,
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
      title: 'Yearly leave',
      icon: <FileStack className='size-5' />,
      value: 5,
      canView: [ROLES.Employee, ROLES.Manager],
      bg: '',
    },
    {
      title: 'Total leaves taken',
      icon: <FileCheck2 className='size-5' />,
      value: 5,
      canView: [ROLES.Employee, ROLES.Manager],
      bg: 'success',
    },
    {
      title: 'Last 6 month',
      icon: <FileClock className='size-5' />,
      value: 5,
      canView: [ROLES.Employee, ROLES.Manager],
      bg: '',
    },
    {
      title: 'Pending Leave',
      icon: <FileClock className='size-5' />,
      value: 5,
      canView: [ROLES.Employee],
      bg: 'pending',
    },
  ];

  return (
    <>
      <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {cardData.map(({ canView, icon, title, bg, value }, index) => {
          return (
            <Card
              key={index}
              className={cn(
                'first:bg-gray-900 group px-5 shadow-none',
                canView.includes(user?.role as string) ? 'block' : 'hidden'
              )}
            >
              <Flex align='center' gap={20} className=''>
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
                    {/* {loadingCards ||
                    loadingDrivers ||
                    loadingFleets ||
                    loadingWallet ? (
                      <LoadingOutlined />
                    ) : (
                      value
                    )} */}
                    {value}
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
