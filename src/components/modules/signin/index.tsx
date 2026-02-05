"use client";

import React, { useEffect } from "react";
import { CustomFormHeader } from "../../common/header";
// import "./style.scss" // Moved to _app;
import { logout, useAuthDispatch } from "@/src/context/authContext";
import Link from "next/link";
import { FcManager, FcPortraitMode } from "react-icons/fc";

const SigninComponent = () => {
  const dispatch = useAuthDispatch();
  useEffect(() => {
    console.log("[Signin] SigninComponent mounted. Clearing session...");
    handleLogout()
    sessionStorage.clear();
  }, []);

  const handleLogout = () => {
    console.log("[Signin] Handling logout...");
    logout(dispatch);
  };

  const channelArr: any = [
    {
      name: "Agent",
      link: "/signin/agent",
      icon: <FcPortraitMode className="icon" />

    },
    {
      name: "MDA",
      link: "/signin/mda",
      icon: <FcManager className="icon" />
    },
  ]

  return (
    <div className="sigin_component">
      <CustomFormHeader title="Sign in Options" desc="Sign in to your portal" />

      <div className="channel_container">
        {channelArr.map((item: any) => (
          <Link href={item.link} key={item.name}>
            <a className="channel">
              <span>{item.icon}</span>
              <span>{item.name} login</span>
            </a>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default SigninComponent;
