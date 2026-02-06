"use client";
import { usePathname, useRouter } from "next/navigation";
import { getLastPathSegment } from "@/src/utils/getLastPathSegment";
import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/common/button";
import "./style.scss";
import { isBrowser } from "@/src/utils/isBrowser";
var Dynamic = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var router = useRouter();
    var _p = useState(null), userData = _p[0], setUserData = _p[1];
    useEffect(function () {
        if (isBrowser) {
            var data_1 = window.sessionStorage.getItem("USER_DATA");
            if (data_1) {
                try {
                    setUserData(JSON.parse(data_1));
                }
                catch (e) {
                    console.error("Error parsing JSON data:", e);
                    setUserData({});
                }
            }
        }
    }, []);
    var path = usePathname();
    var _q = useState({
        mode: false,
        state: "",
        message: "",
    }), show = _q[0], setShow = _q[1];
    var segment = getLastPathSegment(path);
    var fetched_data = sessionStorage.getItem("TICKETS_DATA");
    var data = fetched_data && JSON.parse(fetched_data);
    var ticket = data === null || data === void 0 ? void 0 : data.filter(function (ticket) { return ticket.registrationNumber == segment; });
    return (<div className="ticket-details">
      <h1>Vehicle Details</h1>
      <div className="ticket-details_comp">
        <div>
          <p>Registration Number</p>
          <p>{(_a = ticket[0]) === null || _a === void 0 ? void 0 : _a.registrationNumber}</p>
        </div>

        <div>
          <p>Phone</p>
          <p>{(_b = ticket[0]) === null || _b === void 0 ? void 0 : _b.phone}</p>
        </div>

        <div>
          <p>Owner Name</p>
          <p>{(_c = ticket[0]) === null || _c === void 0 ? void 0 : _c.ownerName}</p>
        </div>

        <div>
          <p>Vehicle Make</p>
          <p>{(_d = ticket[0]) === null || _d === void 0 ? void 0 : _d.vehicleMake}</p>
        </div>

        <div>
          <p>Vehicle Model</p>
          <p>{(_e = ticket[0]) === null || _e === void 0 ? void 0 : _e.vehicleModel}</p>
        </div>

        <div>
          <p>Engine Number</p>
          <p>{(_f = ticket[0]) === null || _f === void 0 ? void 0 : _f.engineNumber}</p>
        </div>

        <div>
          <p>Chassis Number</p>
          <p>{(_g = ticket[0]) === null || _g === void 0 ? void 0 : _g.chassisNumber}</p>
        </div>

        <div>
          <p>Owner Address</p>
          <p>{(_h = ticket[0]) === null || _h === void 0 ? void 0 : _h.ownerAddress}</p>
        </div>

        <div>
          <p>Vehicle Status</p>
          <p>{(_j = ticket[0]) === null || _j === void 0 ? void 0 : _j.vehicleStatus}</p>
        </div>

        <div>
          <p>Vehicle Color</p>
          <p>{(_k = ticket[0]) === null || _k === void 0 ? void 0 : _k.vehicleColor}</p>
        </div>

        <div>
          <p>State of Registration</p>
          <p>{(_l = ticket[0]) === null || _l === void 0 ? void 0 : _l.stateOfRegistration}</p>
        </div>

        <div>
          <p>Expiry Date</p>
          <p>{(_m = ticket[0]) === null || _m === void 0 ? void 0 : _m.expiryDate}</p>
        </div>

        <div>
          <p>Asset Code</p>
          <p>{(_o = ticket[0]) === null || _o === void 0 ? void 0 : _o.assetCode}</p>
        </div>
      </div>

      <Button text={"Back"} onClick={function () { return router.back(); }}/>
    </div>);
};
export default Dynamic;
