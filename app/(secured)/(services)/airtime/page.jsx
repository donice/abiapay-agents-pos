import AirtimeModule from '@/src/components/modules/(services)/airtime';
import React from 'react';
import './style.scss';
export var metadata = {
    title: "Get Airtime - Agents Portal",
    description: "Purchase Airtime Using The AbiaPay App",
};
var AirtimePage = function () {
    return (<div>
      <AirtimeModule />
    </div>);
};
export default AirtimePage;
