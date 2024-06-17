import { InternalAxiosRequestConfig } from "axios";
import axiosInstance from "../lib/axiosInstance";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export function setToken(config: InternalAxiosRequestConfig<any>, idToken = "") {
  if (idToken && idToken !== "") {
    config.headers.common["Authorization"] = `Bearer ${idToken}`;
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("sessionId");
    if (token) {
      setToken(config, token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchDashboardData = async () => {
  try {
    const response = await axiosInstance.get(`${url}/dashboard/data`);
    console.log(response, "RESPOSE DATA")
  } catch (error: any) {
    console.log(error)
  } finally {
  }
};
