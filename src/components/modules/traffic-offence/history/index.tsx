"use client"

import React, { useEffect } from 'react'
import { fetchAllOffences } from '@/src/services/trafficOffences';
import toast from 'react-hot-toast';




const History = () => {
    const getProductsData = async () => {
        try {
          const response = await fetchAllOffences();
          console.log(response, "aLL offences");
        //   setProducts(response?.data);
        } catch {
          toast.error("Error fetching products");
        }
      };
    
      useEffect(() => { getProductsData()   }, []);
  return (
    <div>History</div>
  )
}

export default History