import axios from "axios";
import { useEffect } from "react";
import api from "../api";
import useAuth from "../hooks/useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh`,
              { refreshToken }
            );
            const { token } = response.data;
            setAuth((prev) => ({
              ...prev,
              authToken: token,
            }));
            originalRequest.headers.authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch {
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.authToken, setAuth, auth.refreshToken]);
  return { api };
};

export default useAxios;
