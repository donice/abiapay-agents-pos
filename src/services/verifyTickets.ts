import axiosInstance from "../lib/axiosInstance";

const url = process.env.NEXT_PUBLIC_APP_URL;

export interface VerifyTicketPayload {
  agnetEmail: string;
  referenceID: string;
}

export const verifyTicket = async (requestData: VerifyTicketPayload) => {
  try {
    const { data } = await axiosInstance.post(`${url}/verifyTicket`, requestData);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};