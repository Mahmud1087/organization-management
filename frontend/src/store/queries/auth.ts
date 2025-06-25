import { loginAPI } from '@/actions/apis-requests';
import { USER_DATA, USER_DATA_KEY } from '@/config/app';
import { useLocalStorage } from '@/hooks';
import type {
  AuthDataType,
  AuthMutationOptionsType,
  AuthResponseType,
  GenericAuthDataReturnType,
  LoginRequestDataType,
  MutationOptionsType,
  OwnerAdminAuthDataReturnType,
  StaffAuthDataReturnType,
} from '@/types';
import { isOwnerOrAdmin } from '@/utils/check-user';
import { AppError } from '@/utils/errors';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ****** Queries ******

// get auth status
export function useGetAuthQuery() {
  const { value: userData } = useLocalStorage(USER_DATA, {
    // initialValue: {
    // 	email: 'test@gmail.com',
    // },
    type: 'object',
  });

  const query = useQuery({
    queryKey: ['auth'],
    async queryFn() {
      if (!userData) throw new AppError(401);

      return {
        status: 200 as const,
        message: 'Fetched Auth Data',
        data: userData,
      };
    },
  });

  return query;
}

export function useLoginMutation(
  options: AuthMutationOptionsType<GenericAuthDataReturnType>
) {
  const { setValue: setUserData } = useLocalStorage<GenericAuthDataReturnType>(
    USER_DATA,
    {
      type: 'object',
    }
  );

  const { setValue: setToken } = useLocalStorage(USER_DATA_KEY, {
    type: 'string',
  });

  const mutation = useMutation({
    async mutationFn(form: LoginRequestDataType) {
      const res = await loginAPI(form); // res is AuthResponseType<GenericAuthDataReturnType>
      setUserData(res.data);
      setToken(res.token);
      return res;
    },

    onSuccess(response) {
      // response is AuthResponseType<GenericAuthDataReturnType>
      if (isOwnerOrAdmin(response.data)) {
        options.onSuccess(
          response as AuthResponseType<OwnerAdminAuthDataReturnType>
        );
      } else {
        options.onSuccess?.(
          response as AuthResponseType<StaffAuthDataReturnType>
        );
      }
    },
  });

  return mutation;
}

// logout
export function useLogoutMutation(options: MutationOptionsType) {
  const { value: userData } = useLocalStorage<AuthDataType>(USER_DATA, {
    type: 'object',
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    async mutationFn() {
      if (!userData) throw new AppError(401);

      return {
        status: 200 as const,
        message: 'Logged out successfully.',
      };
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.clear();
      options.onSuccess(response);
    },
  });

  return mutation;
}
