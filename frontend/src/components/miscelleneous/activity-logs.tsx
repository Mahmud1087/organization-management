import { Badge, Flex } from 'antd';
import { Building2, File, LogIn, User2 } from 'lucide-react';
import React from 'react';

const activityLog = [
  {
    title: 'Login',
    desc: 'Login successful',
    time: 'yesterday',
    icon: <LogIn size={16} />,
  },
  {
    title: 'Create',
    desc: 'Added new department',
    time: '5 days ago',
    icon: <Building2 size={16} />,
  },
  {
    title: 'Create',
    desc: 'Added a new staff',
    time: '2 hours ago',
    icon: <User2 size={16} />,
  },
  {
    title: 'Login',
    desc: 'Login successful',
    time: '1 hour ago',
    icon: <LogIn size={16} />,
  },
  {
    title: 'Action',
    desc: 'Leave request approved',
    time: 'yesterday',
    icon: <File size={16} />,
  },
];

const ActivityLogs = () => {
  return (
    <div className='h-full w-full bg-white border shadow-sm rounded-xl p-5 lg:w-full'>
      <h1 className='text-primary font-medium mb-2 border-b pb-2'>
        Activity Logs
      </h1>
      {/* <Flex vertical justify='space-between' gap={10}>
        {activityLogs.map((item, i) => {
          return (
            <Flex key={i} vertical>
              <Flex justify='space-between' align='center'>
                <p className='text-gray-500 font-medium text-sm'>{item.lg}</p>
              </Flex>
              <Progress
                percent={item.percent}
                strokeColor='var(--primary)'
                showInfo={false}
              />
            </Flex>
          );
        })}
      </Flex> */}
      <Flex
        vertical
        gap={12}
        className='lg:max-h-[14rem] lg:overflow-y-scroll no-scrollbar'
      >
        {activityLog.map((activity, i) => {
          return (
            <React.Fragment key={i}>
              <Flex gap={15} align='center'>
                <div className='size-9 rounded-full bg-gray-950/70 text-white flex items-center justify-center'>
                  {activity.icon}
                </div>
                <Flex vertical>
                  <p className='font-medium text-sm'>{activity.title}</p>
                  <Flex gap={8} align='center'>
                    <p className='text-sm text-gray-600'>{activity.desc}</p>
                    <Badge color='var(--primary)' />
                    <p className='text-sm text-gray-600 font-medium'>
                      {activity.time}
                    </p>
                  </Flex>
                </Flex>
              </Flex>
              <hr className='shadow-sm last:hidden' />
            </React.Fragment>
          );
        })}
      </Flex>
    </div>
  );
};
export default ActivityLogs;
