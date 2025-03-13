
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addPoint } from "../store/mapSlice";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
});

// Define the type for the clicked position
type ClickedPosition = [number, number] | null;

const MapComponent: React.FC = () => {
  const position: [number, number] = [29.5918, 52.5837];
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  // const [clickedPosition, setClickedPosition] = useState<ClickedPosition>(null);

  const handleMarkerClick = () => {
    setPopupVisible(!popupVisible); // Toggle popup visibility
  };

  const geolocations = useSelector((state: RootState) => state.map);

  console.log(geolocations.points);
  // Custom hook to handle map click events
  const MapClickHandler = () => {
    useMapEvents({
      click: (event: L.LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
        dispatch(addPoint({ lat, lng }));
      },
    });
    return null; // This component does not render anything
  };

  return (
    <MapContainer
      center={[29.592714, 52.5376106]}
      zoom={13}
      style={{ height: "95vh", width: "100%" }}
    >
      <TileLayer
        url="https://map.pishgamanasia.ir/tile/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Use the custom hook to handle map clicks */}
      <MapClickHandler />

      {geolocations.points?.map((point, index) => {
        return (
          <Marker position={[point.lat, point.lng]} key={index}>
            <Popup>
              <p className="text-right fontMedium ">
                موقعیت نشان شده
              </p>

              <p className="">
                Latitude: {point.lat}
                <br /> Longitude: {point.lng}
              </p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
