import axiosInstance from "../lib/axiosInstance";
const url = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchDashboardData = async () => {
  try {
    const response = await axiosInstance.get(`${url}/dashboard/data`);
    console.log(response, "RESPOSE DATA")
  } catch (error: any) {
    console.log(error)
  } finally {
  }
};

