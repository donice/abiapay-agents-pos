import React from 'react'
import CustomHeader from '@/components/common/header'
import "./style.scss"
import { GoBackButton } from '@/components/common/button'
import AddTransportTicketForm from './form'

const AddTransportTicketComponent = () => {
  return (
    <div>
      <GoBackButton link="/tickets/transport"/>
      <header className="transport-comp_header">
        <CustomHeader title='Add Transport Ticket' desc='Manage/Create Transaction'/>
      </header>

      <div className='transport-comp_form'>
        <AddTransportTicketForm/>
      </div>
    </div>
  )
}

export default AddTransportTicketComponent;