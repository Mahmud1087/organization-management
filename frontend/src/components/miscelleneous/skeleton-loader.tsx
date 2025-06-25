import { Skeleton } from 'antd';

const Loader = () => {
  return (
    <Skeleton.Input
      active
      style={{
        display: 'inline-block',
        width: 'auto',
      }}
      size='small'
    />
  );
};
export default Loader;
