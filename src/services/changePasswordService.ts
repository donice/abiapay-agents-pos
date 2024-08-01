import axiosInstance from "../lib/axiosInstance";
import useIsBrower from "../hooks/useIsBrower";
import { setToken } from "./setToken";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const isToken =
  useIsBrower() && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;
setToken(isToken);

export interface changePasswordOTPType{
  email: string
}

export interface changePasswordType{
  otp: string,
  password: string
}

export const changePasswordOTP = async (requestData: changePasswordOTPType) => {
  try {
    const { data } = await axiosInstance.post(`${url}/user/forgot-password`, requestData);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};
export const changePasswordAPI = async (requestData: changePasswordType) => {
  try {
    const { data } = await axiosInstance.post(`${url}/user/forgot-password-otp-verification`, requestData);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};