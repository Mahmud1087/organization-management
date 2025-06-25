import { Bell, Building, LogOut } from 'lucide-react';
import MobileSidebar from './mobile-sidebar';
import { Flex } from 'antd';
import { useAuthContext, useModalContext } from '@/store/context';
import { Button } from '../ui/button';
import { ConfirmAction } from './confirm-action';
import { CONFIRM_ACTION__MODAL } from '../modals/modal-names';
import { useFetchSingleData } from '@/store/queries/common';
import { COMPANY_API_URL } from '@/actions/services/api-urls';
import type { OrganizationReturnType } from '@/types/dashboard';
import Loader from './skeleton-loader';

const Navbar = () => {
  const { data: user, logout } = useAuthContext();
  const { openConfirmActionModal } = useModalContext();

  const logoutUser = () => {
    openConfirmActionModal(CONFIRM_ACTION__MODAL, {
      title: 'Sign Out',
      desc: 'Are you sure you want to logout?',
      btnText: 'Logout',
      successText: 'Logged out successfully!',
      action: () => {
        logout();
      },
      variant: 'destructive',
    });
  };

  const { data: org, isLoading: loadingOrg } =
    useFetchSingleData<OrganizationReturnType>(
      `${COMPANY_API_URL}${user?.orgId}`
    );

  const now = new Date();
  const greeting =
    now.getHours() < 12
      ? 'Good Morning'
      : now.getHours() < 18
        ? 'Good Afternoon'
        : 'Good Evening';
  const welcomeMessage = `${greeting} ${user?.firstName || 'User'}!`;

  return (
    <>
      <nav className='p-4 flex items-center justify-between border-b lg:px-8'>
        <aside className='relative w-44 lg:w-64'>
          {/* <Input
            className='rounded-full bg-slate-50 placeholder:text-gray-400'
            placeholder='search...'
          />
          <Search className='absolute top-1/2 -translate-y-1/2 right-4 size-5 text-gray-400' /> */}
          <p className='text-xl font-medium'>{welcomeMessage}</p>
        </aside>
        <section className='flex items-center gap-3'>
          <div>
            <Bell className='size-5 text-gray-600' />
          </div>
          <aside className='hidden border-r h-6 lg:block' />
          <aside className='flex items-center gap-2.5'>
            <div className='size-9 flex items-center justify-center rounded-full bg-slate-100'>
              {/* TODO: Add organization image */}
              <Building className='size-5 text-gray-600' />
            </div>
            <Flex vertical>
              <span className='text-sm font-medium hidden md:block'>
                {loadingOrg ? <Loader /> : org?.data.orgName}
              </span>
            </Flex>
          </aside>
          <aside className='hidden border-r h-6 lg:block' />
          <Button
            variant={'destructive'}
            onClick={() => logoutUser()}
            className='hidden md:block'
          >
            <LogOut />
          </Button>
          <div className='md:hidden'>
            <MobileSidebar />
          </div>
        </section>
      </nav>

      <ConfirmAction />
    </>
  );
};
export default Navbar;
