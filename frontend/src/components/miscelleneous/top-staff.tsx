import { Flex } from 'antd';

const topStaffs = [
  {
    name: 'Ahmed Bello',

    leftBox: <div className='w-2 h-full bg-primary'></div>,
  },
  {
    name: 'Faitai Rufai',

    leftBox: <div className='w-2 h-full bg-primary/50'></div>,
  },
  {
    name: 'Ganiyu Danjuma',

    leftBox: <div className='w-2 h-full bg-primary/20'></div>,
  },
  {
    name: 'Maryanne Danjuma',

    leftBox: <div className='w-2 h-full bg-primary/20'></div>,
  },
  {
    name: 'John Kasteni',

    leftBox: <div className='w-2 h-full bg-primary/50'></div>,
  },
];

const TopStaffs = () => {
  return (
    <div className='h-full w-full bg-white border shadow-sm rounded-xl p-5'>
      <h1 className='w-full text-primary font-medium mb-5'>
        Top Perfoming Staff
      </h1>

      <Flex vertical className=''>
        {topStaffs.map((item, i) => {
          return (
            <Flex
              key={i}
              align='center'
              className='h-12 first:border-t border-b even:bg-[#F7F7F7]'
            >
              {item.leftBox}
              <Flex
                gap={10}
                justify='space-between'
                align='center'
                className='w-full py-4'
              >
                <p className='px-4 text-gray-500 text-sm font-medium'>
                  {item.name}
                </p>
                {/* <p className='text-sm font-medium'>
                  Logged in 5 times last month
                </p> */}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
};
export default TopStaffs;
