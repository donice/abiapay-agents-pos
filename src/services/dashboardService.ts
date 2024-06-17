import axiosInstance from "../lib/axiosInstance";
import useIsBrower from "../hooks/useIsBrower";
import { setToken } from "./setToken";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const isToken =
  useIsBrower() && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;
setToken(isToken);

export const fetchDashboardData = async () => {
  try {
    const res = await axiosInstance.post(`${url}/dashboard/data`);
    return res.data;
  } catch (error: any) {
    console.log(error);
  }
};
