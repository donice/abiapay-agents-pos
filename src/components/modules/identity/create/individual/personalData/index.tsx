import React from 'react'
import "../style.scss";
import { FormTextInput } from '@/src/components/common/input';

const PersonalData = ({setFormData} : any) => {
  return (
    <div>
      <FormTextInput
        label="First Name"
        name="first_name"
        placeholder="Enter first name"
        />
    </div>
  )
}

export default PersonalData