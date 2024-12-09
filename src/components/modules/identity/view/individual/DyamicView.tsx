"use client";
import { CustomFormHeader } from "@/src/components/common/header";
import LargeLoader from "@/src/components/common/loader";
import { getIndividualABSSINs } from "@/src/services/identityService";
import { transformStringWithUnderscores } from "@/src/utils/transformStringWithUnderscores";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { TbUser } from "react-icons/tb";

const DyamicView = ({ id }: { id: string }) => {
  const [abssinView, setAbssinView] = useState<Record<string, any> | null>(
    null
  );
  const { data, isLoading } = useQuery({
    queryKey: ["ticketsWalletData"],
    queryFn: getIndividualABSSINs,
  });

  useEffect(() => {
    if (data) {
      const res = data?.data;
      const abssin = res.find((item: any) => item.state_id === id);
      if (abssin) {
        const nonNullFields = Object.entries(abssin)
          .filter(([_, value]) => value !== null)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        setAbssinView(nonNullFields);
      }
    }
  }, [data, id]);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <LargeLoader />
    </div>
  ) : abssinView ? (
    <div className="rounded-lg items-center flex flex-col">
      <CustomFormHeader
        title={"Individual ABSSIN Details"}
        desc={`View all details associated with ${id}`}
      />
      <div className="w-full max-w-[150px] h-40 border rounded-lg flex items-center justify-center bg-green-50">
        {abssinView?.PhotoID ? (
          <TbUser className="text-3xl text-gray-400" />
        ) : null}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        {Object.entries(abssinView).map(([key, value]) => (
          <div
            key={key}
            className="py-4 bg-white rounded-lg shadow-sm flex items-center justify-between border-b-2 border-dashed border-gray-100"
          >
            <p className="text-sm font-medium text-gray-600">
              {transformStringWithUnderscores(key)}
            </p>
            <p className="text-sm font-semibold text-gray-800">{value}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center mt-10 text-gray-600">
      <p>No data found for the provided ID.</p>
    </div>
  );
};

export default DyamicView;
