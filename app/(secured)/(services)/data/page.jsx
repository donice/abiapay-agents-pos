import DataModule from '@/src/components/modules/(services)/data';
import React from 'react';
export var metadata = {
    title: "Get Data - Agents Portal",
    description: "Purchase Data Using The AbiaPay App",
};
var DataPage = function () {
    return (<div>
      <DataModule />
    </div>);
};
export default DataPage;
