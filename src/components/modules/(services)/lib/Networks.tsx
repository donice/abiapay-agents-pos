import React, { useState } from 'react'
import "./style.scss"

interface NetworkProps {
  onNetworkSelect: (network: string) => void;
}

const Networks: React.FC<NetworkProps> = ({ onNetworkSelect }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  const networkArr = [
    {
      name: "MTN",
      value: "mtn",
      img: "https://www.mtn.ng/wp-content/themes/mtn-vivid-wp/public/img/mtn-logo.svg",
    },
    {
      name: "Airtel",
      value: "airtel",
      img: "https://cdn-webportal.airtelstream.net/website/investor/main/images/logo/airtel-logo.png"
    },
    {
      name: "Glo",
      value: "glo",
      img: "https://www.gloworld.com/logo.png",
    },
    {
      name: "9mobile",
      value: "etisalat",
      img: "https://9mobile.com.ng/_next/static/media/logos.2143115e.png",
    },
  ];

  const handleNetworkClick = (value: string) => {
    setSelectedNetwork(value);
    onNetworkSelect(value);
  };

  return (
    <div className="networks-container">
      <h1 className="networks-title">Select Network</h1>
      <div className="networks-grid">
      {networkArr.map((network) => (
        <div
        key={network.value}
        className={`network-item ${selectedNetwork === network.value ? 'selected' : ''}`}
        onClick={() => handleNetworkClick(network.value)}
        >
        <div className="network-content">
          <img className="network-logo" src={network.img} alt={network.name} />
        </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Networks