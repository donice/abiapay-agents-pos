import MDASigninComponent from '@/src/components/modules/signin/mda';
import React from 'react';
export var metadata = {
    title: "Sigin to Agents Portal",
    description: "Abia Pay for Agents Portal Dashboard",
};
var MDASignInPage = function () {
    return (<div>
      <MDASigninComponent />
    </div>);
};
export default MDASignInPage;
