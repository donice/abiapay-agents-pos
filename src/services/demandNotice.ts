import axiosInstance from "../lib/axiosInstance";

const url = process.env.NEXT_PUBLIC_BASE_URL;


export interface generateDemandNoticePayload {
    taxpayerID: string;

  }

  export interface searchDemandNoticePayload {
    notice_number: string;
    year:string;
  };

  export interface createDemandNoticePayload {
   taxpayer_id: [
    {
      id: string
    }
  ],
  cdn_category_id?: number,
  createdby?: string,
  fiscal_year?: string
}


  export const searchDemandNotice = async (requestData: searchDemandNoticePayload) => {
    try {
      const { notice_number, year } = requestData;
      const res = await axiosInstance.get(`${url}/cdn/notice/${notice_number}?year=${year}`);
  
      return res;
    } catch (error: any) {
      return {
        error: error.response?.data?.message || "Failed to fetch demand notice",
      };
    }
  };

  export const createDemandNotice = async (
    requestBody: createDemandNoticePayload
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `${url}/cdn/create-demand-notice`,
        requestBody 
      );
      return data;
    } catch (error: any) {
      throw new Error(`Error creating Demand Notice: ${error?.message}`);
    }
  };
  