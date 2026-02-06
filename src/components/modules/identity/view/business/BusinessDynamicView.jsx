import React from 'react';

const BusinessDynamicView = ({ id }) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Business Details</h1>
            <p>Viewing Business ID: {id}</p>
            <p className="text-red-500">Error: Component BusinessDynamicView was missing from the codebase.</p>
        </div>
    );
};

export default BusinessDynamicView;
