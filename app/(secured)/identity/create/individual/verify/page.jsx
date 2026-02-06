import VerifyComponent from '@/src/components/modules/identity/create/individual/verify';
import React from 'react';
import { GoBackButton } from '@/src/components/common/button';
export var metadata = {
    title: "Create ABSSIN",
    description: "Create ABSSIN",
};
var VerifyPage = function () {
    return (<>
    <GoBackButton />
    <div><VerifyComponent /></div>
    </>);
};
export default VerifyPage;
