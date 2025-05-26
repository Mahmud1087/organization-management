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
    <Flex>
      <Flex>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </Flex>
      <div>{children}</div>
    </Flex>
  );
};
export default DashboardHeader;
