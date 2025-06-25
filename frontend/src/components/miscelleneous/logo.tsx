import { COMPANY_API_URL } from '@/actions/services/api-urls';
import { useAuthContext } from '@/store/context';
import { useFetchSingleData } from '@/store/queries/common';
import Loader from './skeleton-loader';
import type { OrganizationReturnType } from '@/types/dashboard';
import { cn } from '@/lib/utils';

const Logo = () => {
  const { data: user } = useAuthContext();
  const { data, isLoading: loadingOrg } =
    useFetchSingleData<OrganizationReturnType>(
      `${COMPANY_API_URL}${user?.orgId}`
    );

  return (
    <div
      className={cn(
        'size-12 rounded-full flex items-center justify-center bg-primary text-white uppercase text-xl'
      )}
    >
      {loadingOrg ? <Loader /> : data?.data.orgName.slice(0, 2)}
    </div>
  );
};
export default Logo;
