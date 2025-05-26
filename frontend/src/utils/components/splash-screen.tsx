// import { APP_NAME } from '@/config/app';
// import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const SplashScreen = () => (
  <div className='flex flex-col flex-grow fixed h-full items-center justify-center w-full bg-gray-200'>
    {/* <Spin
      indicator={<LoadingOutlined className='text-gray-100' />}
      spinning
      tip={
        <div className='opacity-65 mt-4'>
          <div className='logo-image mx-auto'>
            <img className='h-full w-full' src='/vite.svg' alt={APP_NAME} />
          </div>
          {title ? (
            <span
              className='animate-pulse duration-300 inline-block mt-4 text-gray-100 text-center text-base md:text-lg'
              style={{
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {title}
            </span>
          ) : null}
        </div>
      }
      fullscreen
    /> */}
    <Spin />
  </div>
);

export default SplashScreen;
