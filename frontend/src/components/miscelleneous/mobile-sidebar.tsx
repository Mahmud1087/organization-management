import { LogOut, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import Logo from './logo';
import { sideNavLists } from '@/lib/mock-data';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useAuthContext } from '@/store/context';

const MobileSidebar = () => {
  const { pathname } = useLocation();
  const { data: user, logout } = useAuthContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader className='border-b'>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <section className='px-5 flex flex-col gap-3 mt-6'>
          {sideNavLists.map(({ id, href, icon, name }) => {
            return (
              <Link
                to={href}
                key={id}
                className={cn(
                  'px-8 py-2.5',
                  pathname === href
                    ? 'bg-gray-950 text-accent font-medium border-r-4 border-r-primary rounded-lg'
                    : ''
                )}
              >
                <div className='flex items-center gap-5'>
                  <span>{icon}</span>
                  <span>{name}</span>
                </div>
              </Link>
            );
          })}
        </section>
        <SheetFooter>
          <div className='mt-auto py-4 border-t'>
            <div className='flex items-center gap-3'>
              <img
                src='https://i.pravatar.cc/40'
                alt='Profile'
                className='w-10 h-10 rounded-full'
              />
              <div>
                <p className='text-sm font-medium'>
                  {user?.firstName + ' ' + user?.lastName}
                </p>
                <p className='text-sm text-primary italic'>{user?.role}</p>
              </div>
            </div>
          </div>
          <Button
            variant={'destructive'}
            className='flex w-full items-center gap-3.5 justify-center'
            onClick={logout}
          >
            <span>
              <LogOut />
            </span>
            <span>Sign Out</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar;
