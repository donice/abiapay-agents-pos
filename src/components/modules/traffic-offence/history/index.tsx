"use client"

import React, { useEffect } from 'react'
import { fetchAllOffences } from '@/src/services/trafficOffences';
import toast from 'react-hot-toast';


const offencesData = [
  {
    id: 1,
    title:
      "COMMERCIAL TRICYCLE, MOTOCYCLE AND BUSES OPERATING WITHIN THE STATE WITHOUT DRIVER’S/CONDUCTOR’S IDENTITY BADGE.",
    code: "LCG-9",
    point: "2",
    description: "Impound vehicle",
    violation_type: "LICENCE CONDITION",
    fee: "5000",
  },
  {
    id: 2,
    title:
      "NOT PAINTING COMMERCIAL VEHICLES OPERATING IN THE STATE IN APPROVED COLOUR",
    code: "LCC-01",
    point: "4",
    description: "Impound vehicle",
    violation_type: "LICENCE CONDITION",
    fee: "10000",
  },
  {
    id: 3,
    title: "NON-DISPLAY OF MOT NUMBER ON COMMERCIAL VEHICLE",
    code: "LCC-2",
    point: "2",
    description: "Impound vehicle",
    violation_type: "LICENCE CONDITION",
    fee: "5000",
  },
  {
    id: 4,
    title: "DISOBEYING TRAFFIC CONTROL PERSONNEL OR TRAFFIC SIGNS BY BUSES",
    code: "TSM-1",
    point: "1",
    description: "Impound vehicle",
    violation_type: "TRAFFIC SIGNS AND MARKINGS",
    fee: "10000",
  },
];

const History = () => {
    const getProductsData = async () => {
        try {
          const response = await fetchAllOffences();
          console.log(response, "aLL offences");
          // setProducts(response?.data);
        } catch {
          toast.error("Error fetching products");
        }
      };
    
      useEffect(() => { getProductsData()   }, []);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Traffic Offences</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Code</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Violation Type</th>
              <th className="border p-2">Points</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Fee (₦)</th>
            </tr>
          </thead>
          <tbody>
            {offencesData.map((offence) => (
              <tr key={offence.id} className="border">
                <td className="border p-2">{offence.code}</td>
                <td className="border p-2">{offence.title}</td>
                <td className="border p-2">{offence.violation_type}</td>
                <td className="border p-2">{offence.point}</td>
                <td className="border p-2">{offence.description}</td>
                <td className="border p-2">{offence.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History