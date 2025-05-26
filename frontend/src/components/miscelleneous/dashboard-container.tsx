import DesktopSidebar from './desktop-sidebar';
import Navbar from './navbar';

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex w-full lg:px-10 md:py-4'>
      <div className='fixed top-0 left-0 bg-gray-950 text-white h-screen z-50 md:w-1/4 lg:w-1/5'>
        <DesktopSidebar />
      </div>
      <section className='relative md:left-1/4 lg:left-[20%] w-full md:w-3/4 lg:w-4/5'>
        <div className='fixed top-0 left-0 z-50 bg-white w-full md:left-1/4 lg:left-[20%] md:w-3/4 lg:w-4/5'>
          <Navbar />
        </div>
        <main className='bg-dashboard-bg px-4 relative pt-16'>{children}</main>
      </section>
    </div>
  );
};
export default DashboardContainer;
