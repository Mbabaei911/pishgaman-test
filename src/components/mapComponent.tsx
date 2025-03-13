import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addPoint } from "../store/mapSlice";
import React from "react";
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
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
});

// Define the type for the clicked position
type Point = {
  lat: number;
  lng: number;
};

const MapComponent: React.FC = () => {
  const dispatch = useDispatch();
  const geolocations = useSelector((state: RootState) => state.map);

  // Custom hook to handle map click events
  const MapClickHandler = () => {
    useMapEvents({
      click: (event: L.LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
        console.log("Clicked at:", lat, lng); // Log the clicked position
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

      {geolocations.points && geolocations.points.length > 0 ? (
        geolocations.points.map((point: Point, index: number) => (
          <Marker position={[point.lat, point.lng]} key={index}>
            <Popup>
              <p className="text-right fontMedium">موقعیت نشان شده</p>
              <p>
                Latitude: {point.lat}
                <br /> Longitude: {point.lng}
              </p>
            </Popup>
          </Marker>
        ))
      ) : (
        <p>No points available</p> // Fallback if no points are available
      )}
    </MapContainer>
  );
};

export default MapComponent;
