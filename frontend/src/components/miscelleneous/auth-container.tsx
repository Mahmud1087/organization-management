import React from 'react';
import Logo from './logo';

type AuthContainerType = {
  containerClassName?: string;
  showTermsAndConditions?: boolean;
  children: React.ReactNode;
  heading: React.ReactNode;
  title: React.ReactNode;
};

function AuthContainer({
  containerClassName = '',
  //   showTermsAndConditions = true,
  children,
  heading,
  title,
}: AuthContainerType) {
  return (
    <div className='bg-white flex h-full min-h-screen w-full px-2 md:flex-row lg:px-4'>
      <div className='w-full lg:w-[40%] h-screen items-center hidden lg:flex py-4'>
        <div className='relative h-full'>
          <aside className='w-full h-full'>
            <img
              src='/auth-pic.jpeg'
              alt='Auth Image'
              className='w-full h-full rounded-md object-cover'
            />
          </aside>
          <div className='absolute top-0 left-0 flex flex-col justify-between h-full w-full'>
            <div className='p-8'>
              <Logo />
            </div>
            <div className='text-white relative overflow-hidden'>
              <div className=' bg-black/70 blur-2xl w-full absolute h-full left-0 top-0' />
              <h2 className='text-2xl font-medium relative z-20 px-8 pt-5'>
                The simplest way to manage your organization effectively.
              </h2>
              <p className='light mt-3 text-[#efefefbd] relative z-20 pb-8 px-8 text-lg'>
                Experience a better and reliable way to manage your organization
                with OrgMan
              </p>
              {/* <Flex align='center' gap={5} className='mt-8'>
                {[1, 2, 3].map((_, i) => {
                  return (
                    <div
                      key={i}
                      className='h-[6px] w-[6px] rounded-full first:bg-white bg-white/[0.2]'
                    ></div>
                  );
                })}
              </Flex> */}
            </div>
          </div>
        </div>
      </div>

      <div className='relative w-full px-4 flex flex-col items-center justify-center mt-6 md:mt-0 lg:w-[60%]'>
        <div className='w-full md:w-[55%] lg:w-[75%] xl:w-[55%]'>
          <div className={containerClassName}>
            {/* TODO: Add logo */}
            <div className='text-center flex flex-col gap-1 mb-6'>
              <h2 className='text-2xl font-medium'>{heading}</h2>
              <p className='text-gray-400'>{title}</p>
            </div>
            {children}
          </div>
          {/* {showTermsAndConditions && (
            <div>
              <p className='relative mt-16 bottom-5 right-1/2 translate-x-1/2 md:mt-0 md:absolute'>
                By clicking “Login or Continue, you assert that you have read
                and <br className='hidden md:block' />
                agreed to our{' '}
                <Link
                  to={'/terms-of-service'}
                  className='text-green-400 underline'
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  to={'/privacy-policy'}
                  className='text-green-400 underline'
                >
                  Privacy Policy.
                </Link>
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
