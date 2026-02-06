"use client";
import { GoBackButton } from '@/src/components/common/button';
import { CustomHeader } from '@/src/components/common/header';
import React, { useState } from 'react';
import Form from './form';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Empty from '@/src/components/common/empty';
import { formatAmount } from '@/src/utils/formatAmount';
import { TbLoader } from 'react-icons/tb';
// import "./style.scss" // Moved to _app;
var SearchTrafficTicket = function () {
    var router = useRouter();
    var _a = useState([]), ticketsData = _a[0], setTicketsData = _a[1];
    var _b = useState(false), searched = _b[0], setSearched = _b[1];
    if (ticketsData) {
        sessionStorage.setItem("TICKETS_DATA", JSON.stringify(ticketsData));
    }
    return (<section>
        <GoBackButton />

        <div className="find">
            <header>
                <CustomHeader title='Search Traffic Offence Ticket' desc=' '/>    
            </header>

            <div className="find-comp-form">
               <Form setTicketsData={setTicketsData} setSearched={setSearched}/> 
               <div className="main-table">
               {ticketsData && ticketsData.length > 0 ? (<div className="main-table_form_tickets_container">
              <div className="tickets">
                {ticketsData.map(function (transaction, index) { return (<div key={index} className="ticket" onClick={function () {
                    return router.push("/traffic-offence/traffic-ticket-history/".concat(transaction.payment_reference));
                }}>
                    <div>
                    <p>{transaction.plate_number}</p>
                    <p>{transaction.offence_type}</p>
                      <p>{transaction.payment_reference}</p>
                    </div>
                     <div>
                                     <p>₦{formatAmount(transaction.amount)}</p>
                                     <p className={"".concat(transaction.status === "Completed"
                    ? "completed"
                    : "pending")}>
                                       {transaction.status === "Completed" ? (<GoVerified />) : (<TbLoader />)}
                                       {transaction.status}
                                     </p>
                   
                                     
                                   </div>
                  </div>); })}
              </div>
            </div>) : searched ? (<Empty text="No Plate Number Found"/>) : null}
               </div>

             
            </div>
        </div>
    </section>);
};
export default SearchTrafficTicket;
