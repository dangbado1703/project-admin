import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8081",
});
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("auth");
  const configAxios = config;
  if (configAxios && configAxios.headers && token) {
    configAxios.headers.Authorization = `Bearer ${token}`;
  }
  return configAxios;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.status || (error.response ? error.response.status : 0);
    // if (status === 401) {
    //   toast.error("Hết phiên đăng nhập", { toastId: 401 });
    // }
    if (status === 400) {
      const errMessage: any = error.response?.data;
      toast.error(errMessage.messages[0], { toastId: 400 });
    }
    return Promise.reject(error);
  }
);

export default instance;
