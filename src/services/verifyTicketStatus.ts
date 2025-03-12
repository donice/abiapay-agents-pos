import axiosInstance, { https } from "../lib/axiosInstance";

const url = process.env.NEXT_PUBLIC_BASE_URL;
const ibm = process.env.NEXT_PUBLIC_APIC_KEY;

export interface VerifyTicketStatusPayload {
  agentEmail: string;
  referenceID: string;
  verifyType?: string;
  verificationType: string;
  noticeNumber?: string;
  enumerationYear?: string;
  billReference?: string;
  abssin: string;
}

export const verifyTicket = async (requestData: VerifyTicketStatusPayload) => {
  try {
    const res = await axiosInstance.post(
      `${url}/transport/verify-ticket`,
      requestData
    );

    return res;
  } catch (error: any) {
    return {
      error: error.data
    }
  }
};

