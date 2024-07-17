import { Button } from '@/src/components/common/button'
import React from 'react'

const OwnerData = ({setStage}: any) => {
  return (
    <div>OwnerData
      <Button onClick={() => setStage(2)} text='Save & Continue'/>
    </div>
  )
}

export default OwnerData