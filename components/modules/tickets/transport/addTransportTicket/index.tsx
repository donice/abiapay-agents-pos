import React from 'react'
import CustomHeader from '@/components/common/header'
import "./style.scss"

const AddTransportTicketComponent = () => {
  return (
    <div>
      <header className="dashboard_header">
        <CustomHeader title='Add Transport Ticket' desc='Manage/Create Transaction'/>
      </header>
    </div>
  )
}

export default AddTransportTicketComponent;