import type { AuthDataType, LoginRequestDataType } from '@/types';
import { apiClient } from '../services/api-instance';
import { LOGIN_API_URL } from '../services/api-urls';

export const loginAPI = async (data: LoginRequestDataType) => {
  const res = await apiClient.post<AuthDataType>(LOGIN_API_URL, data);

  return res.data;
};
