import React from "react";
import phoneCardB from "../../assets/phoneCardB.jpg";
import phoneCardA from "../../assets/phoneCardA.jpg";
import phoneCardC from "../../assets/phoneCardC.jpg";
import DeviceCards from "../DeviceCards/DeviceCards";

const Phones = () => {
  return (
    <>
    <div className="grid grid-cols-3 gap-4">
      <DeviceCards deviceImage={phoneCardB} deviceName="Samsung Galaxy 23 Ultra" deviceSpeci="Green, 12GB, 256GB Storage" devicePrice="71,999" />
      <DeviceCards deviceImage={phoneCardA} deviceName="iPhone 16" deviceSpeci="Blue 8GB, 128GB Storage" devicePrice="80,999" />
      <DeviceCards deviceImage={phoneCardC} deviceName="OnePlus" deviceSpeci="Blue 8GB, 128GB Storage" devicePrice="43,999" />
      <DeviceCards deviceImage={phoneCardA} deviceName="OnePlus" deviceSpeci="Blue 8GB RAM 128GB ROM" devicePrice="43,999" />
      <DeviceCards deviceImage={phoneCardB} deviceName="OnePlus" deviceSpeci="Blue 8GB RAM 128GB ROM" devicePrice="43,999" />
      <DeviceCards deviceImage={phoneCardC} deviceName="OnePlus" deviceSpeci="Blue 8GB RAM 128GB ROM" devicePrice="43,999" />
    </div>
      
    </>
  );
};

export default Phones;
