import { postReqAPI } from '@/actions/apis-requests';
import { apiClient } from '@/actions/services/api-instance';
import type { MutationOptionsType, ResponseType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosRequestHeaders } from 'axios';

export function useFetchData<T>(
  url: string,
  limit?: number,
  offset?: number,
  enabled?: boolean
) {
  const query = useQuery<ResponseType<T>>({
    queryKey: [`${url}?limit=${limit}&offset=${offset}`],
    enabled,
  });

  return query;
}

// get by id query
export function useFetchSingleData<T>(url: string, enabled?: boolean) {
  const query = useQuery<ResponseType<T>>({
    queryKey: [`${url}`],
    enabled,
  });
  return query;
}

export function usePostMutations<T, U>(
  options: MutationOptionsType<ResponseType<U>>,
  url: string
) {
  const mutation = useMutation({
    async mutationFn(req: { form: T; headers?: AxiosRequestHeaders }) {
      const data = await postReqAPI<T, U>(req.form, url, req.headers);
      return {
        status: 200,
        message: data.message,
        data,
      };
    },
    onSuccess(response) {
      options.onSuccess(response);
    },
  });

  return mutation;
}

export function useUploadImageMutation(options: MutationOptionsType<null>) {
  const mutation = useMutation({
    async mutationFn(req: { file: File; id?: string; url: string }) {
      if (!req.file) {
        return;
      }
      const formData = new FormData();
      formData.append('image', req.file);
      formData.append('id', req.id as string);

      const res = await apiClient.post<ResponseType<null>>(req.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        status: 200,
        message: res.data.message,
        data: null,
      };
    },
    onSuccess(response) {
      options.onSuccess(response!);
    },
  });

  return mutation;
}
