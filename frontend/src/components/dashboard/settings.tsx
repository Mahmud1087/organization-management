import SettingsContainer from '@/container/dashboard/settings';
import DashboardContainer from '../miscelleneous/dashboard-container';
import DashboardHeader from '../miscelleneous/dashboard-header';

const Settings = () => {
  return (
    <DashboardContainer>
      <div className='mt-8 md:mt-6 lg:mt-4'>
        <DashboardHeader
          title='Settings'
          subtitle='Make changes to your account here'
        />
        <div className='mt-6'>
          <SettingsContainer />
        </div>
      </div>
    </DashboardContainer>
  );
};
export default Settings;
