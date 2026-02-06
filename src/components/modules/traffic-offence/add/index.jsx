"use client";
import { GoBackButton } from '@/src/components/common/button';
import { CustomHeader } from '@/src/components/common/header';
import React from 'react';
import AddTrafficOffenceTicketForm from './form';
var AddTrafficOffenceTicket = function (_a) {
    var show = _a.show, setShow = _a.setShow;
    var _b = React.useState(""), selectedType = _b[0], setSelectedType = _b[1];
    var _c = React.useState(""), selectedVehicleType = _c[0], setSelectedVehicleType = _c[1];
    return (<section>
      <GoBackButton />
      <div className="">
        <header>
          <CustomHeader title="Add Traffic Offence Ticket" desc="Create Traffic Offence Ticket"/>
        </header>

        <div className="">
          <AddTrafficOffenceTicketForm setSelectedType={setSelectedType} setSelectedVehicleType={setSelectedVehicleType}/>
        </div>
      </div>
    </section>);
};
export default AddTrafficOffenceTicket;
