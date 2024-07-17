import axiosInstance from "../lib/axiosInstance";
import useIsBrower from "../hooks/useIsBrower";
import { setToken } from "./setToken";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const isToken =
  useIsBrower() && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;
setToken(isToken);

export interface VerifyPlateNumberType {
  phone_number: string,
  plate_number: string,
  merchant_key: string
}

export interface SaveVehicleDetailsProps {
  plate_number: string,
  owner_phone_number: string,
  vehicle_make: string,
  vehicle_model: string,
  engine_number: string,
  chassis_number: string,
  owner_name: string,
  owner_address: string,
  vehicleStatus: string,
  vehicle_color: string,
  state_of_registration: string,
  expiry_date: string,
  merchant_key: string
}

export const verifyPlateNumber = async (requestBody: VerifyPlateNumberType) => {
  try {
    const { data } = await axiosInstance.post(`${url}/vehicle/verify-plate-number`, requestBody);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};

export const saveVehicleDetails = async (requestBody: SaveVehicleDetailsProps) => {
  try {
    const { data } = await axiosInstance.post(`${url}/vehicle/save-vehicle-details`, requestBody);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};

