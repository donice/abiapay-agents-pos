import axiosInstance from "../lib/axiosInstance";
import useIsBrower from "../hooks/useIsBrower";
import { setToken } from "./setToken";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const isToken =
  useIsBrower() && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;
setToken(isToken);


export interface validateIdPayloadType {
  id: string,
  source: string
}

export interface validateNoIdPayloadType {
  value: string,
  verify_via: string
}

export interface verifyIdOtpPayloadType {
  code: string
}

export interface verifyNoIdOtpPayloadType {
  otp: string
}

export interface createIndividualAbssinPayloadType {
  indv_title: string,
  first_name: string,
  middle_name: string,
  surname: string,
  birth_date: string,
  email: string,
  gender: string,
  nin: string,
  nationality: string,
  state_of_origin: string,
  state_of_residence: string,
  marital_status: string,
  bvn: string,
  city: string,
  ward: string,
  address: string,
  lga: string,
  phone_number: string,
  sector: string,
  category: string,
  tax_office: string,
  mobile_number: string,
  image: string
}

export const validateID = async (requestData: validateIdPayloadType) => {
  try {
    const { data } = await axiosInstance.post(`${url}/abssin/validate-ids`, requestData);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};

export const validateNoID = async (requestData: validateNoIdPayloadType) => {
  try {
    const { data } = await axiosInstance.post(`${url}/abssin/validate-ids`, requestData);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};

export const validateIDOtp = async (requestData: verifyIdOtpPayloadType) => {
  try {
    const { data } = await axiosInstance.post(`${url}/abssin/validate-ids`, requestData);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};

export const validateNoIDOtp = async (requestData: verifyNoIdOtpPayloadType) => {
  try {
    const { data } = await axiosInstance.post(`${url}/abssin/validate-ids`, requestData);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};

export const createIndividualAbssin = async (requestData: createIndividualAbssinPayloadType) => {
  try {
    const { data } = await axiosInstance.post(`${url}/abssin/validate-ids`, requestData);
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching transactions: ${error?.message}`);
  }
};
