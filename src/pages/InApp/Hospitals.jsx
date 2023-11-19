import React, { useCallback, useEffect, useState } from "react";
import Map from "../../components/Map";
import axios from "axios";

function Hospitals() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hospitals, setHospitals] = useState(null);
  const [radius, setRadius] = useState(0.02);

  // GET CURRENT LOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  console.log(currentLocation);

  const getHospitals = useCallback(async () => {
    if (!currentLocation) return null;
    const lat = currentLocation.latitude;
    const lon = currentLocation.longitude;
    var point1 = (lon - radius).toString().substring(0, 10);
    var point2 = (lat + radius).toString().substring(0, 10);
    var point3 = (lon + radius).toString().substring(0, 10);
    var point4 = (lat - radius).toString().substring(0, 10);
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=rect:${point1},${point2},${point3},${point4}&apiKey=${
          import.meta.env.REACT_APP_GEO_API_KEY
        }`
      );
      console.log(res.data);
      setHospitals(res.data.features);
    } catch (err) {
      console.log(err);
    }
  }, [currentLocation, radius]);

  useEffect(() => {
    getHospitals();
  }, [getHospitals]);

  if (!currentLocation) return null;

  return (
    <Map
      setRadius={setRadius}
      currentLocation={currentLocation}
      setCurrentLocation={setCurrentLocation}
      hospitals={hospitals}
    />
  );
}

export default Hospitals;
