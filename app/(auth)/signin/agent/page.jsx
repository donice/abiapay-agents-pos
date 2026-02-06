import AgentsSigninComponent from '@/src/components/modules/signin/agent';
import React from 'react';
export var metadata = {
    title: "Sigin to Agents Portal",
    description: "Abia Pay for Agents Portal Dashboard",
};
var AgentSignInPage = function () {
    return (<div>
      <AgentsSigninComponent />
    </div>);
};
export default AgentSignInPage;
