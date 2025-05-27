import { Flex } from 'antd';

type DashboardHeaderProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

const DashboardHeader = ({
  title,
  subtitle,
  children,
}: DashboardHeaderProps) => {
  return (
    <Flex align='center' justify='space-between'>
      <Flex vertical gap={6}>
        <h1 className='text-xl font-medium lg:text-2xl'>{title}</h1>
        <h2 className='text-gray-500 text-sm lg:text-base'>{subtitle}</h2>
      </Flex>
      <div>{children}</div>
    </Flex>
  );
};
export default DashboardHeader;
