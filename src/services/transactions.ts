import axiosInstance from "../lib/axiosInstance";
import useIsBrower from "../hooks/useIsBrower";
import { setToken } from "./setToken";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const isToken =
  useIsBrower() && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;
setToken(isToken);

export const fetchTransactions = async () => {
  try {
    const { data } = await axiosInstance.post(`${url}/wallet/transfer-history`);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};
