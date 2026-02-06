import React from 'react';
import Image from 'next/image';
import Logo from "../../assets/logo.svg";
import AbiaStatelogo from "../../assets/abia_logo.jpeg";
import LogoWhite from "../../assets/logo_white.svg";
import EnumerartionLogo from "../../../../public/abia-logo.jpg";
export var AbiaLogo = function () {
    return (<div>
      <Image src={Logo} alt="Abiapay Agents Logo" width={100} loading='eager' priority={true}/>
    </div>);
};
export var AbiaStateLogo = function () {
    return (<div>
      <Image src={AbiaStatelogo} alt="Abiapay State Logo" width={70} loading='eager' priority={true}/>
    </div>);
};
export var AbiaLogoWhite = function () {
    return (<div>
      <Image src={LogoWhite} alt="Abiapay Agents Logo" width={100} loading='eager' priority={true}/>
    </div>);
};
export var AbiaLogoLarge = function () {
    return (<div>
      <Image src={Logo} alt="Abiapay Agents Logo" width={150} loading='eager' priority={true}/>
    </div>);
};
export var AbiaEnumerationLarge = function () {
    return (<div>
      <Image src={EnumerartionLogo} alt="Abiapay Agents Logo" width={75} loading='eager' priority={true}/>
    </div>);
};
