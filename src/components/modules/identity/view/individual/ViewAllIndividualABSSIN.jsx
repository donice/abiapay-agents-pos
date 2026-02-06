// This componemt is written using tailwind because of time. Please follow through with it
import React from "react";
import { TbUser } from "react-icons/tb";
import { MdOutlineShareLocation } from "react-icons/md";
import Link from "next/link";
var ViewAllIndividualABSSIN = function (data) {
    var _a, _b;
    console.log((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.data, "data");
    var ABSSINs = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.data;
    return (<div>
      {ABSSINs === null || ABSSINs === void 0 ? void 0 : ABSSINs.map(function (abssin, idx) { return (<Link href={"/identity/view/individual/".concat(abssin === null || abssin === void 0 ? void 0 : abssin.state_id)} key={idx}>
          <a className="border-b border-gray-300 py-4 grid  gap-4">
            <div className="">
              {/* {abssin?.PhotoID ? <Image src={abssin?.PhotoID  || '/images/default.png'} alt={""} width={100} height={100} className="object-cover"/> : <div></div>} */}
              {(abssin === null || abssin === void 0 ? void 0 : abssin.PhotoID) ? (<TbUser className="text-3xl text-gray-400"/>) : null}
            </div>
            <div className="col-span-2 text-sm flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-green-500">
                  {abssin === null || abssin === void 0 ? void 0 : abssin.state_id}
                </h2>
                <p className="font-[600] capitalize text-gray-600">
                  {abssin === null || abssin === void 0 ? void 0 : abssin.surname} {abssin === null || abssin === void 0 ? void 0 : abssin.first_name} {abssin === null || abssin === void 0 ? void 0 : abssin.middle_name}{" "}
                </p>
                <p className="text-gray-400 text-[10px]">{abssin === null || abssin === void 0 ? void 0 : abssin.email}</p>
                <p className="text-gray-400 text-[10px]">
                  Date of birth: {abssin === null || abssin === void 0 ? void 0 : abssin.birth_date}
                </p>
              </div>

              <div>
                <p className="text-gray-400 flex items-center gap-1 text-[10px]">
                  <MdOutlineShareLocation className="text-sm"/> {abssin === null || abssin === void 0 ? void 0 : abssin.lga}
                </p>
                <p className="text-gray-400">{abssin === null || abssin === void 0 ? void 0 : abssin.address}</p>
              </div>
            </div>
          </a>
        </Link>); })}
    </div>);
};
export default ViewAllIndividualABSSIN;
