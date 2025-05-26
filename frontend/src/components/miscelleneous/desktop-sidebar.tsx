import { sideNavLists } from '@/lib/mock-data';
import Logo from './logo';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/store/context';

const DesktopSidebar = () => {
  const { pathname } = useLocation();
  const { data: user } = useAuthContext();

  return (
    <aside className='h-screen text-white flex-col justify-between px-3 lg:px-4 py-6 shadow-md hidden md:flex'>
      {/* Logo Section */}
      <div>
        <div className='flex items-center gap-2 mb-16'>
          <Logo />
        </div>

        {/* Navigation Links */}
        <nav className='flex flex-col gap-3'>
          {sideNavLists.map(({ href, canView, icon, id, name }) => {
            const isActive = pathname === href;
            return (
              <Link
                to={href}
                key={id}
                className={cn(
                  'items-center gap-4 px-5 lg:px-8 py-2.5 rounded-full transition-colors duration-200 hidden',
                  isActive
                    ? 'bg-primary text-accent font-semibold'
                    : 'hover:bg-primary hover:text-accent hover:font-semibold text-white',
                  canView.includes(user?.role as string) && 'flex'
                )}
              >
                <span className='text-lg'>{icon}</span>
                <span className='text-sm'>{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer or Profile */}
      <div className='mt-auto pt-6 border-t border-white/30'>
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
            <p className='text-xs text-white/70'>{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
