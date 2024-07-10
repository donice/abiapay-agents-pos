import axiosInstance from "../lib/axiosInstance";

const url = process.env.NEXT_PUBLIC_APP_URL;
const ibm = process.env.NEXT_PUBLIC_IBM;

export interface VerifyTicketPayload {
  agentEmail: string;
  referenceID: string;
}

export const verifyTicket = async (requestData: VerifyTicketPayload) => {
  try {
    const { data } = await axiosInstance.post(
      `${url}/verifyTicket`,
      requestData,
      {
        headers: {
          "X-IBM-Client-Id": ibm,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(`Error verifying ticket: ${error?.message}`);
  }
};
