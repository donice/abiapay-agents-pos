import React from "react";
// import "./style.scss" // Moved to _app;
import AddMarketTicketForm from "./form";
var AddMarketTicketComponent = function () {
    return (<section className="market_add">
      <div className="market-comp">
        <div className="market-comp_form">
          <AddMarketTicketForm />
        </div>
      </div>
    </section>);
};
export default AddMarketTicketComponent;
