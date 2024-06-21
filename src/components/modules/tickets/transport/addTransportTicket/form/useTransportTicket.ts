import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchLGAData, fetchProducts } from "@/src/services/common";
import { randomInvoiceGenerator } from "@/src/utils/randomInvoiceGenerator";
import { getCurrentDateTime } from "@/src/utils/getCurrentDateTime";
import toast from "react-hot-toast";
import axios from "axios";
import useIsBrower from "@/src/hooks/useIsBrower";
import { useRouter } from "next/navigation";

interface Product {
  productCode: string;
  productName: string;
  dailyAmount: number;
  weeklyAmount: number;
  monthlyAmount: number;
}

interface Inputs {
  merchant_key: string;
  lga: string;
  transaction_date: string;
  invoice_id: string;
  agentEmail: string;
  plateNumber: string;
  paymentPeriod: string;
  productCode: string;
  taxPayerPhone: string;
  taxPayerName: string;
  next_expiration_date: string;
  no_of_days: string;
  amount: number;
  wallet_type: string;
}


let data = useIsBrower() && sessionStorage.getItem("USER_DATA")
const user_data = data && JSON.parse(data)

export const useTransportTicketForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: {
      merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY || "",
      transaction_date: getCurrentDateTime(),
      invoice_id: `INV${randomInvoiceGenerator()}`,
      paymentPeriod: "",
      productCode: "",
      next_expiration_date: "",
      no_of_days: "",
      amount: 0,
      lga: "",
      agentEmail: "",
      plateNumber: "",
      taxPayerPhone: "",
      taxPayerName: "",
      wallet_type: "",
    },
  });
  const router = useRouter();
  const [lga, setLga] = useState([{ value: "", label: "" }]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  useEffect(() => {
    setValue("agentEmail", user_data?.email);
    setValue("taxPayerPhone", user_data?.phone);
    setValue("taxPayerName", user_data?.name);
  })
  const onSubmit = async (data: Inputs) => {
    const formData = {
      ...data,
      transaction_date: getCurrentDateTime(),
      invoice_id: `INV${randomInvoiceGenerator()}`,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/transport/create-ticket`,
        formData
      );

      console.log(formData);

      const response = res?.data;

      if (response.response_code == "00") {
        toast.success("Ticket Created Successfully");
        useIsBrower() && sessionStorage.setItem("TRANSPORT_INVOICE", JSON.stringify(response));
        router.push("/tickets/transport/add/summary");
      } else {
        toast.error(`${response.response_message}, Try again`);
      }
    } catch {
      toast.error("Error Creating Ticket");
    }
  };

  const getLGAData = async () => {
    try {
      const { data } = await fetchLGAData();
      const lga_from_api = data.map((item: any) => ({
        label: item.lgaName,
        value: item.lgaID,
      }));
      setLga(lga_from_api);
    } catch {
      toast.error("Error fetching LGA data");
    }
  };

  const getProductsData = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response?.data);
    } catch {
      toast.error("Error fetching vehicles");
    }
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productCode = event.target.value;
    setSelectedProduct(productCode);
    setValue("productCode", productCode);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const period = event.target.value;
    setSelectedPeriod(period);
    setValue("paymentPeriod", period);

    const selectedProductData = products.find(
      (product) => product.productCode === selectedProduct
    );

    let amount = 0;
    let no_of_days = "0";
    switch (period) {
      case "1 Day":
        no_of_days = "1";
        amount = selectedProductData?.dailyAmount || 0;
        break;
      case "1 Week":
        no_of_days = "7";
        amount = selectedProductData?.weeklyAmount || 0;
        break;
      case "1 Month":
        no_of_days = "30";
        amount = selectedProductData?.monthlyAmount || 0;
        break;
    }
    setValue("no_of_days", no_of_days);

    const transaction_date = new Date();
    const next_expiration_date = new Date(
      transaction_date.getTime() + parseInt(no_of_days) * 24 * 60 * 60 * 1000
    );

    setValue("next_expiration_date", next_expiration_date.toISOString());
    setValue("amount", amount);
  };

  useEffect(() => {
    getLGAData();
    getProductsData();
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    lga,
    products,
    selectedProduct,
    selectedPeriod,
    onSubmit,
    handleProductChange,
    handlePeriodChange,
  };
};
