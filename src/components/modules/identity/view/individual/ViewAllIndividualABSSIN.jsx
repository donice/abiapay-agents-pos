// This componemt is written using tailwind because of time. Please follow through with it
import React from "react";
import { TbUser } from "react-icons/tb";
import { MdOutlineShareLocation } from "react-icons/md";
import Link from "next/link";
var ViewAllIndividualABSSIN = function (data) {
    var _a, _b;
    console.log((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.data, "data");
    var ABSSINs = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.data;
    return (<div className="individual-list">
      {ABSSINs === null || ABSSINs === void 0 ? void 0 : ABSSINs.map(function (abssin, idx) { return (<Link href={"/identity/view/individual/".concat(abssin === null || abssin === void 0 ? void 0 : abssin.state_id)} key={idx} className="individual-item"> 
          <div className="individual-item__left">{(abssin === null || abssin === void 0 ? void 0 : abssin.PhotoID) ? (<TbUser className="individual-item__avatar"/>) : (<div className="individual-item__avatar--placeholder"><TbUser/></div>)}</div>
          <div className="individual-item__body">
            <div className="individual-item__head">
              <h2 className="individual-item__id">{abssin === null || abssin === void 0 ? void 0 : abssin.state_id}</h2>
              <p className="individual-item__name">{abssin === null || abssin === void 0 ? void 0 : abssin.surname} {abssin === null || abssin === void 0 ? void 0 : abssin.first_name} {abssin === null || abssin === void 0 ? void 0 : abssin.middle_name}</p>
              <p className="individual-item__meta">{abssin === null || abssin === void 0 ? void 0 : abssin.email}</p>
              <p className="individual-item__meta">Date of birth: {abssin === null || abssin === void 0 ? void 0 : abssin.birth_date}</p>
            </div>
            <div className="individual-item__foot">
              <p className="individual-item__location"><MdOutlineShareLocation/> {abssin === null || abssin === void 0 ? void 0 : abssin.lga}</p>
              <p className="individual-item__address">{abssin === null || abssin === void 0 ? void 0 : abssin.address}</p>
            </div>
          </div>
        </Link>); })}
    </div>);
};
export default ViewAllIndividualABSSIN;
