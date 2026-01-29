import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

let accessToken = '';

export function setAccessToken(newToken: string): void {
  accessToken = newToken;
}

export function clearAccessToken(): void {
  accessToken = '';
}

type CustomAxiosRequestConfig = {
  sent?: boolean;
} & InternalAxiosRequestConfig;

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization ??= `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config: CustomAxiosRequestConfig }) => {
    const prev = error.config;
    if (error.response?.status === 403 && !prev?.sent) {
      prev.sent = true;
      try {
        const response: AxiosResponse<{ accessToken: string }> = await axiosInstance.get(
          '/auth/refresh',
        );
        const newToken = response.data.accessToken;
        setAccessToken(newToken);
        prev.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(prev);
      } catch (refreshError) {
        clearAccessToken();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
