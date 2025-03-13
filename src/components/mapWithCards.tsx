import React from "react";
import { Header, Card } from "@/components/modalsComponent";
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("@/components/mapComponent"), {
  ssr: false,
});

const MapWithCards: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <Header />
      <MapComponent />
      <div className=" bottom-0 z-[400] fixed left-1/2 -translate-x-1/2">
        <Card />
      </div>
    </div>
  );
};

export default MapWithCards;
