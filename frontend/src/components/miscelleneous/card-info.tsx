import { LoadingOutlined } from '@ant-design/icons';
import { Card, Flex } from 'antd';
import type { JSX } from 'react';

type CardInfoProps = {
  loading: boolean;
  icon: JSX.Element;
  title: string;
  value: string | number | undefined;
};

const CardInfo = ({ icon, title, value, loading }: CardInfoProps) => {
  return (
    <Card className=''>
      <Flex align='center' gap={20} className=''>
        <div className='h-11 w-11 bg-primary/40 text-gray-700 group-first:bg-primary group-first:text-white rounded-full flex items-center justify-center'>
          {icon}
        </div>

        <Flex vertical gap={6}>
          <h3 className='group-first:text-white text-gray-600 text-sm font-medium'>
            {title}
          </h3>
          <h2 className='group-first:text-white text-xl font-bold text-gray-600'>
            {loading ? <LoadingOutlined /> : value}
          </h2>
        </Flex>
      </Flex>
    </Card>
  );
};
export default CardInfo;
