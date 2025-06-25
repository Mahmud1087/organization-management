import type { AuthDataType, LoginRequestDataType, ResponseType } from '@/types';
import { apiClient } from './services/api-instance';
import { LOGIN_API_URL } from './services/api-urls';
import type { AxiosRequestHeaders } from 'axios';

export const loginAPI = async (data: LoginRequestDataType) => {
  const res = await apiClient.post<AuthDataType>(LOGIN_API_URL, data);

  return res.data;
};

// update data api
export async function updateDataAPI<T>(data: { url: string; id: number }) {
  const res = await apiClient.put<ResponseType<T>>(`${data.url}${data.id}`, {});

  return res.data;
}

// post api
export const postReqAPI = async <T, U>(
  data: T,
  url: string,
  headers?: AxiosRequestHeaders
) => {
  const response = await apiClient.post<ResponseType<U>>(url, data, {
    headers,
  });

  return response.data;
};

// upload image mutation
export const useUploadImage = async (req: {
  file: File;
  id?: string;
  url: string;
}) => {
  if (!req.file) {
    return;
  }
  const formData = new FormData();
  formData.append('image', req.file);
  formData.append('id', req.id as string);

  const data = await apiClient.post<ResponseType<null>>(req.url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
