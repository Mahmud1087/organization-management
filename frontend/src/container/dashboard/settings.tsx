import OrgSettings from '@/components/dashboard/org-settings';
import Profile from '@/components/dashboard/profile';
import Security from '@/components/dashboard/security';
import { ROLES } from '@/config/constants';
import { useAuthContext } from '@/store/context';
import { Flex } from 'antd';
import { useState } from 'react';

const SettingsContainer = () => {
  // const { data: user } = useAuthContext();

  return (
    <div>
      {/* {user?.role === ROLES.Owner || user?.role === ROLES.Admin ? ( */}
      <OwnerAdmin />
      {/* ) : ( */}
      {/* <Staff />
      )} */}
    </div>
  );
};

type Tab = 'Personal Details' | 'Change Password' | 'Organization Details';
const OwnerAdmin = () => {
  const { data: user } = useAuthContext();
  const [tab, setTab] = useState<Tab>('Personal Details');

  const tabs = [
    'Personal Details',
    'Change Password',
    (user?.role === ROLES.Admin || user?.role === ROLES.Owner) &&
      'Organization Details',
  ];

  return (
    <>
      <div className='bg-white shadow border mt-10 rounded-lg flex flex-col gap-6'>
        <div className='flex flex-col gap-3.5 px-5 lg:flex-row md:px-6 lg:gap-10'>
          <aside className='w-full lg:w-[30%] pt-8 lg:py-8'>
            <Flex gap={8} className='flex-col md:flex-row lg:flex-col'>
              {tabs.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`w-full py-3 px-3 xl:px-7 text-sm cursor-pointer transition-all rounded-xl hover:font-semibold ${
                      tab === item
                        ? 'bg-primary text-white font-semibold  w-full'
                        : 'text-gray-500 font-medium'
                    }`}
                    onClick={() => setTab(item as Tab)}
                  >
                    {/* <span>{istem}</span> */}
                    <p>{item}</p>
                  </div>
                );
              })}
            </Flex>
          </aside>

          <hr className='h-[inherit] my-5 border-r' />
          <aside className='pb-8 w-full lg:py-8 lg:w-[75%]'>
            {tab === 'Personal Details' ? (
              <Profile />
            ) : tab === 'Change Password' ? (
              <Security />
            ) : (
              user?.role === ROLES.Admin ||
              (user?.role === ROLES.Owner && <OrgSettings />)
            )}
          </aside>
        </div>
      </div>
    </>
  );
};

// const Staff = () => {
//   return <div>Settings</div>;
// };

export default SettingsContainer;
