"use client"

import React, { useEffect, useState } from 'react'
import { fetchOffenceHistory } from '@/src/services/trafficOffences';
import toast from 'react-hot-toast';
import { GoVerified } from 'react-icons/go';
import { TbLoader } from 'react-icons/tb';
import Empty from '@/src/components/common/empty';
import './style.scss'
import { formatAmount } from '@/src/utils/formatAmount';
import { CustomHeader } from '@/src/components/common/header';
import { GoBackButton } from '@/src/components/common/button';
import useIsBrower from '@/src/hooks/useIsBrower';




const History = () => {

  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    if (useIsBrower()) {
      const data = window.sessionStorage.getItem("USER_DATA");
      if (data) {
        try {
          setUserData(JSON.parse(data));
        } catch (e) {
          console.error("Error parsing JSON data:", e);
          setUserData({});
        }
      }
    }
  }, []);


  const [products, setProducts] = React.useState<any[]>([]);
    const getProductsData = async () => {
        try {
          const response = await fetchOffenceHistory({ email: userData?.email ?? "" });
          console.log(response?.data, "aLL offences");
          setProducts(response?.data);
        } catch {
          toast.error("Error fetching products");
        }
    };
    
      useEffect(() => { getProductsData()   }, []);
  return (
    <>
    <GoBackButton />
   <header className="bills_comp_header">
           <CustomHeader title="Traffic Ticket History" desc="View Traffic Ticket History" />
          
         </header>
    <section className="main-table">
      {products.length > 0 ? (
        <div className="main-table_form_tickets_container">
          <div className="tickets">
            {products.map((transaction: any, index: any) => (
              <div
                key={index}
                className="ticket"
                // onClick={() =>
                //   router.push(
                //     `/bills/${transaction.transref}`
                //   )
                // }
              >
                <div>
                  <p>Plate Number:{transaction.plate_number}</p>
                  <p>{transaction.offence_type}</p>
                  <p>{transaction.payment_reference}</p>
                </div>
                <div>
                <p>{transaction.vehicle_type}</p>
                  <p>₦{formatAmount(transaction.amount)}</p>
                  <p
                    className={`${
                      transaction.status === "Completed"
                        ? "completed"
                        : "pending"
                    }`}
                  >
                    {transaction.status === "Completed" ? (
                      <GoVerified />
                    ) : (
                      <TbLoader />
                    )}
                    {transaction.status}
                  </p>

                  <p className="next_date">
                  
                    <span>
                      {" "}
                      {transaction.occurrence}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty text="No tickets found" />
      )}
    </section>
    </>
  )
}

export default History