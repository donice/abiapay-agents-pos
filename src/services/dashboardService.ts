import axiosInstance from "../lib/axiosInstance";
const url = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchDashboardData = async () => {
 const res = await axiosInstance.get(`${url}/dashboard/data`);
 console.log(res, "res")
 return res;
};
