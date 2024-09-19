import axiosInstance from "../lib/axiosInstance";
import useIsBrower from "../hooks/useIsBrower";
import { setToken } from "./setToken";
import { CreateTicketPayload } from "../components/types/ticketTypes";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const isToken =
  useIsBrower() && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;
setToken(isToken);

export interface Product {
  productCode: string;
  productName: string;
  dailyAmount: number;
  weeklyAmount: number;
  monthlyAmount: number;
}

export interface TransactionsTypes {
  page: number;
  limit: number;
}

export const createNewTicket = async (requestData: CreateTicketPayload) => {
  try {
    const { data } = await axiosInstance.post(
      `${url}/transport/create-ticket`,
      requestData
    );
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};

export const fetchTransactions = async () => {
  try {
    const { data } = await axiosInstance.post(`${url}/transport/transactions`, {
      page: 1,
      limit: 200,
    });
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};

export const fetchPlateNumberInfo = async (plate_number: string) => {
  try {
    const { data } = await axiosInstance.post(
      `${url}/transport/get-plate-number-info`,
      { plate_number: plate_number }
    );
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};
