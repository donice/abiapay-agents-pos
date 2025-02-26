"use client";


import { GoBackButton } from '@/src/components/common/button'
import { CustomHeader } from '@/src/components/common/header'
import React, { useState } from 'react'
import Form from './form'
import { useRouter } from 'next/navigation'

const SearchTrafficTicket = () => {
    const router = useRouter();
  const [ticketsData, setTicketsData] = useState([]);
  const [searched, setSearched] = useState(false);

  if (ticketsData) {
    sessionStorage.setItem("TICKETS_DATA", JSON.stringify(ticketsData));
  }
  
  return (
    <section>
        <GoBackButton/>

        <div className="find">
            <header>
                <CustomHeader title='Search Traffic Offence Ticket' desc='Enter Traffic Ticket Number to search ' />    
            </header>

            <div className="find-comp-form">
               <Form setTicketsData={setTicketsData} setSearched={setSearched}/> 
            </div>
        </div>
    </section>
  )
}

export default SearchTrafficTicket