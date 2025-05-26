import { Bell, Building, LogOut, Search } from 'lucide-react';
import { Input } from '../ui/input';
import MobileSidebar from './mobile-sidebar';
import { Flex } from 'antd';
import { useAuthContext } from '@/store/context';
import { Button } from '../ui/button';
import { useState } from 'react';
import { ConfirmAction } from './confirm-action';

const Navbar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { logout } = useAuthContext();

  return (
    <>
      <nav className='p-4 flex items-center justify-between border-b lg:px-8'>
        <aside className='relative w-44 lg:w-64'>
          <Input
            className='rounded-full bg-slate-50 placeholder:text-gray-400'
            placeholder='search...'
          />
          <Search className='absolute top-1/2 -translate-y-1/2 right-4 size-5 text-gray-400' />
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
                Organization Name
              </span>
            </Flex>
          </aside>
          <aside className='hidden border-r h-6 lg:block' />
          <Button
            variant={'destructive'}
            onClick={() => setOpenDialog(true)}
            className='hidden md:block'
          >
            <LogOut />
          </Button>
          <div className='md:hidden'>
            <MobileSidebar />
          </div>
        </section>
      </nav>

      <ConfirmAction
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title='Logout'
        desc='Are you sure you want to logout?'
        action={logout}
        variant={'destructive'}
        btnText={'Logout'}
      />
    </>
  );
};
export default Navbar;
