import axiosInstance from "../lib/axiosInstance";
import useIsBrower from "../hooks/useIsBrower";
import { setToken } from "./setToken";
import { CreateTicketPayload } from "../components/types/ticketTypes";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const createNewTicket = async (requestData: CreateTicketPayload) => {
  try {
    const { data } = await axiosInstance.post(`${url}/transport/create-ticket`, requestData);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};
