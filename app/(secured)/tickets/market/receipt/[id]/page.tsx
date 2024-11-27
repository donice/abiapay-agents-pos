import ViewReceiptComponent from '@/src/components/modules/tickets/market/receipt'
import React from 'react'

const ViewReceiptPage = ({ params }: { params: { id: string } }) => {


  return (
    <div>
      <ViewReceiptComponent id={params.id}/>
    </div>
  )
}

export default ViewReceiptPage