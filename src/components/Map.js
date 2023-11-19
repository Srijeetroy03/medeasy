import { useState, memo, useMemo, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Map, {
  GeolocateControl,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  Source,
  Layer,
  FillExtrusionLayer,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Pin from "./Pin";
import { routeLayer } from "./layers";
import { Link } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import {
  MdMail,
  MdOutlineDriveEta,
  MdOutlineWebStories,
  MdPhone,
} from "react-icons/md";
import { FaWalking, FaHospitalAlt, FaPhone } from "react-icons/fa";
import {
  IoBicycle,
  IoGlobe,
  IoGlobeOutline,
  IoInformation,
} from "react-icons/io5";
import { AiOutlineEnter } from "react-icons/ai";

const VR = () => (
  <div className="w-0 min-h-full border-[1px] border-neutral-200"></div>
);

const UserPin = () => (
  <svg
    width="50"
    height="51"
    viewBox="0 0 50 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_ii_120_33)">
      <path
        d="M23.5717 1C18.6765 1.00578 13.9834 2.95297 10.5219 6.41444C7.06041 9.87592 5.11322 14.569 5.10744 19.4643C5.10158 23.4647 6.4083 27.3566 8.82716 30.5429C8.82716 30.5429 9.33073 31.2059 9.41298 31.3016L23.5717 48L37.7372 31.2932C37.811 31.2042 38.3163 30.5429 38.3163 30.5429L38.318 30.5378C40.7356 27.3529 42.0417 23.4629 42.036 19.4643C42.0302 14.569 40.083 9.87592 36.6216 6.41444C33.1601 2.95297 28.467 1.00578 23.5717 1Z"
        fill="#16A34A"
      />
    </g>
    <g filter="url(#filter1_d_120_33)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.6427 5.96484C16.1477 5.96484 10.0723 12.0403 10.0723 19.5353C10.0723 27.0302 16.1477 33.1057 23.6427 33.1057C31.1376 33.1057 37.2131 27.0302 37.2131 19.5353C37.2131 12.0403 31.1376 5.96484 23.6427 5.96484ZM18.893 16.1427C18.893 15.5189 19.0159 14.9013 19.2546 14.325C19.4933 13.7488 19.8431 13.2252 20.2842 12.7842C20.7252 12.3431 21.2488 11.9933 21.8251 11.7546C22.4013 11.5159 23.019 11.393 23.6427 11.393C24.2664 11.393 24.884 11.5159 25.4603 11.7546C26.0366 11.9933 26.5601 12.3431 27.0012 12.7842C27.4422 13.2252 27.7921 13.7488 28.0308 14.325C28.2695 14.9013 28.3923 15.5189 28.3923 16.1427C28.3923 17.4023 27.8919 18.6104 27.0012 19.5012C26.1105 20.3919 24.9024 20.8923 23.6427 20.8923C22.383 20.8923 21.1749 20.3919 20.2842 19.5012C19.3934 18.6104 18.893 17.4023 18.893 16.1427ZM32.1351 26.2988C31.1192 27.5766 29.8278 28.6084 28.3573 29.3171C26.8867 30.0258 25.2751 30.3931 23.6427 30.3916C22.0103 30.3931 20.3986 30.0258 18.9281 29.3171C17.4576 28.6084 16.1661 27.5766 15.1503 26.2988C17.3501 24.7205 20.3519 23.6064 23.6427 23.6064C26.9335 23.6064 29.9353 24.7205 32.1351 26.2988Z"
        fill="#F2F1F1"
      />
    </g>
    <defs>
      <filter
        id="filter0_ii_120_33"
        x="-0.892578"
        y="1"
        width="50.9287"
        height="51"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="10" dy="4" />
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.11625 0 0 0 0 0.516667 0 0 0 0 0.263921 0 0 0 0.45 0"
        />
        <feBlend
          mode="multiply"
          in2="shape"
          result="effect1_innerShadow_120_33"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-8" dy="3" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.100833 0 0 0 0 0.733333 0 0 0 0 0.334096 0 0 0 0.37 0"
        />
        <feBlend
          mode="hard-light"
          in2="effect1_innerShadow_120_33"
          result="effect2_innerShadow_120_33"
        />
      </filter>
      <filter
        id="filter1_d_120_33"
        x="0.0722656"
        y="0.964844"
        width="49.1406"
        height="49.1406"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1" dy="6" />
        <feGaussianBlur stdDeviation="5.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0"
        />
        <feBlend
          mode="multiply"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_120_33"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_120_33"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const HospitalPin = () => (
  <svg
    width="44"
    height="53"
    viewBox="0 0 44 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M43.5 47C43.5 47.5636 43.0749 48.2223 42.0002 48.9153C40.9479 49.5938 39.392 50.2237 37.4248 50.7603C33.4975 51.8313 28.0438 52.5 22 52.5C15.9562 52.5 10.5025 51.8313 6.57521 50.7603C4.60798 50.2237 3.05214 49.5938 1.99983 48.9153C0.925132 48.2223 0.5 47.5636 0.5 47C0.5 46.4364 0.925132 45.7777 1.99983 45.0847C3.05214 44.4062 4.60798 43.7763 6.57521 43.2397C10.5025 42.1687 15.9562 41.5 22 41.5C28.0438 41.5 33.4975 42.1687 37.4248 43.2397C39.392 43.7763 40.9479 44.4062 42.0002 45.0847C43.0749 45.7777 43.5 46.4364 43.5 47Z"
      fill="#FDA9AE"
      fill-opacity="0.84"
    />
    <path
      d="M43.5 47C43.5 47.5636 43.0749 48.2223 42.0002 48.9153C40.9479 49.5938 39.392 50.2237 37.4248 50.7603C33.4975 51.8313 28.0438 52.5 22 52.5C15.9562 52.5 10.5025 51.8313 6.57521 50.7603C4.60798 50.2237 3.05214 49.5938 1.99983 48.9153C0.925132 48.2223 0.5 47.5636 0.5 47C0.5 46.4364 0.925132 45.7777 1.99983 45.0847C3.05214 44.4062 4.60798 43.7763 6.57521 43.2397C10.5025 42.1687 15.9562 41.5 22 41.5C28.0438 41.5 33.4975 42.1687 37.4248 43.2397C39.392 43.7763 40.9479 44.4062 42.0002 45.0847C43.0749 45.7777 43.5 46.4364 43.5 47Z"
      stroke="#FA979D"
    />
    <path
      d="M43.5 47C43.5 47.5636 43.0749 48.2223 42.0002 48.9153C40.9479 49.5938 39.392 50.2237 37.4248 50.7603C33.4975 51.8313 28.0438 52.5 22 52.5C15.9562 52.5 10.5025 51.8313 6.57521 50.7603C4.60798 50.2237 3.05214 49.5938 1.99983 48.9153C0.925132 48.2223 0.5 47.5636 0.5 47C0.5 46.4364 0.925132 45.7777 1.99983 45.0847C3.05214 44.4062 4.60798 43.7763 6.57521 43.2397C10.5025 42.1687 15.9562 41.5 22 41.5C28.0438 41.5 33.4975 42.1687 37.4248 43.2397C39.392 43.7763 40.9479 44.4062 42.0002 45.0847C43.0749 45.7777 43.5 46.4364 43.5 47Z"
      stroke="black"
      stroke-opacity="0.2"
    />
    <g filter="url(#filter0_ii_121_41)">
      <path
        d="M22.4643 0C17.569 0.00577508 12.8759 1.95297 9.41446 5.41444C5.95299 8.87592 4.00579 13.569 4.00002 18.4643C3.99416 22.4647 5.30088 26.3566 7.71973 29.5429C7.71973 29.5429 8.22331 30.2059 8.30556 30.3016L22.4643 47L36.6298 30.2932C36.7036 30.2042 37.2089 29.5429 37.2089 29.5429L37.2106 29.5378C39.6282 26.3529 40.9343 22.4629 40.9286 18.4643C40.9228 13.569 38.9756 8.87592 35.5141 5.41444C32.0527 1.95297 27.3596 0.00577508 22.4643 0Z"
        fill="#DC0F1B"
      />
    </g>
    <path
      d="M13 29V9H18.7165V16.8125H26.2835V9H32V29H26.2835V21.1875H18.7165V29H13Z"
      fill="white"
    />
    <defs>
      <filter
        id="filter0_ii_121_41"
        x="-2"
        y="0"
        width="50.9287"
        height="51"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="10" dy="4" />
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.7 0 0 0 0 0.0845833 0 0 0 0 0.121508 0 0 0 1 0"
        />
        <feBlend
          mode="multiply"
          in2="shape"
          result="effect1_innerShadow_121_41"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-8" dy="3" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0.5375 0 0 0 0 0.56525 0 0 0 1 0"
        />
        <feBlend
          mode="hard-light"
          in2="effect1_innerShadow_121_41"
          result="effect2_innerShadow_121_41"
        />
      </filter>
    </defs>
  </svg>
);

const secondsToHms = (d) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hr, " : " hrs, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " min" : " mins") : "";
  return hDisplay + mDisplay;
};

const metersToKm = (d) => {
  d = Number(d);
  var km = Math.round(d + Number.EPSILON) / 1000;
  var kmDisplay = km > 0 ? km + (km === 1 ? " km" : " kms") : "";
  return kmDisplay;
};

function HospitalMap({
  width = "100vw",
  height = "100vh",
  currentLocation,
  setCurrentLocation,
  hospitals,
  setRadius,
}) {
  const mapRef = useRef(null);

  const bringMapToCenter = (location) => {
    mapRef.current?.flyTo({
      center: [parseFloat(location[0]), parseFloat(location[1])],
      zoom: 12,
      duration: 2000,
    });
  };

  const [popupInfo, setPopupInfo] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitalRoute, setHospitalRoute] = useState(null);
  const [hospitalRoutes, setHospitalRoutes] = useState(null);

  const mediums = [
    {
      name: "Driving",
      value: "driving-traffic",
      icon: <MdOutlineDriveEta />,
    },
    {
      name: "Walking",
      value: "walking",
      icon: <FaWalking />,
    },
    {
      name: "Cycling",
      value: "cycling",
      icon: <IoBicycle />,
    },
    {
      name: "Driving (No Traffic)",
      value: "driving",
      icon: <MdOutlineDriveEta />,
    },
  ];

  const HospitalsPin = () => (
    <FaHospitalAlt className="bg-red-600 text-white text-lg p-1 rounded-sm" />
  )

  const [medium, setMedium] = useState(mediums[0]);

  const pins = useMemo(
    () =>
      hospitals &&
      hospitals.map((hospital, index) => {
        return (
          <Marker
            key={`marker-${index}`}
            longitude={parseFloat(hospital.geometry.coordinates[0])}
            latitude={parseFloat(hospital.geometry.coordinates[1])}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedHospital(hospital);
              bringMapToCenter(hospital.geometry.coordinates);
            }}
          >
            <HospitalsPin />
          </Marker>
        );
      }),
    [hospitals]
  );

  const [viewPort, setViewPort] = useState({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    zoom: 12,
    pitch: 45,
    bearing: -17.6,
  });

  const findRoute = useCallback(async () => {
    if (!selectedHospital) return null;
    const lat1 = currentLocation.latitude;
    const lon1 = currentLocation.longitude;
    const lat2 = selectedHospital.geometry.coordinates[1];
    const lon2 = selectedHospital.geometry.coordinates[0];
    try {
      const res = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/${medium.value}/${lon1},${lat1};${lon2},${lat2}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN}`
      );
      console.log("Hospital Route", res.data);
      setHospitalRoute(res.data.routes[0].geometry);
      setHospitalRoutes(res.data.routes);
    } catch (err) {
      console.log(err);
    }
  }, [selectedHospital, medium, currentLocation]);

  useEffect(() => {
    findRoute();
  }, [findRoute]);

  if (!viewPort) return null;

  return (
    <div className="relative">
      <Map
        ref={mapRef}
        mapLib={import("mapbox-gl")}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN}
        initialViewState={viewPort}
        onViewportChange={(viewPort) => {
          setViewPort(viewPort);
        }}
        style={{
          width: width,
          height: height,
        }}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
        interactive="true"
      >
        <section className="absolute rounded-xl bottom-0 lg:inset-0 z-10 w-full lg:w-fit h-fit m-0 lg:m-4 flex flex-col bg-white lg:bg-transparent lg:flex-row gap-4 items-start">
          <div className="flex lg:flex-col gap-2 px-4 pt-6  lg:p-0 flex-wrap">
            <Link
              to="/"
              className="p-2 bg-white rounded-md w-fit text-2xl shadow-md"
            >
              <TiHomeOutline />
            </Link>
            {selectedHospital &&
              mediums &&
              mediums.map((m, index) => {
                console.log(medium);
                return (
                  <button
                    title={m.name}
                    key={`medium-${index}`}
                    onClick={() => setMedium(m)}
                    className={`p-2 rounded-md w-fit text-2xl shadow-md ${
                      m.value === medium.value
                        ? "bg-slate-900 text-white"
                        : "text-black bg-white"
                    }`}
                  >
                    {m.icon}
                  </button>
                );
              })}
          </div>
          <div className="space-y-2 w-full">
            <div className="w-full px-4 lg:px-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setRadius(parseInt(e.target[0].value) / 100);
                }}
                className="pr-2 order-2 lg:order-3 py-2 space-x-2 bg-white rounded-md text-lg shadow-md inline-flex justify-between items-end w-full"
              >
                <input
                  className="pl-2 self-center lg:flex-1 w-min"
                  type="number"
                  name="range"
                  placeholder="Enter range in kms"
                />
                <label
                  htmlFor="range"
                  className="text-neutral-400 text-sm ml-0"
                >
                  kms
                </label>
                <button
                  type="submit"
                  className="bg-slate-900 text-white py-2 px-4 rounded-md"
                >
                  <AiOutlineEnter />
                </button>
              </form>
            </div>
            {selectedHospital && hospitalRoute && (
              <div className="bg-green-600 lg:rounded-lg w-full lg:max-w-[500px] h-fit shadow-md text-[0.85rem] font-manrope overflow-hidden order-3 lg:order-2">
                <div className="p-4 rounded-b-lg drop-shadow-xl bg-white flex flex-col gap-1 ">
                  <h1 className="text-xl font-bold text-slate-900">
                    {selectedHospital?.properties?.name}
                  </h1>
                  <p className="">
                    {selectedHospital?.properties?.address_line2}
                  </p>
                  <p className="text-neutral-500">
                    Lat: {selectedHospital?.geometry?.coordinates[0]}, Lon:{" "}
                    {selectedHospital?.geometry?.coordinates[1]}
                  </p>
                  <div className="flex flex-wrap w-full items-center lg:min-w-[500px] gap-2 py-4 lg:py-2">
                    {selectedHospital?.properties?.datasource?.raw[
                      "website"
                    ] && (
                      <a
                        className="badge"
                        href={
                          selectedHospital?.properties?.datasource?.raw[
                            "website"
                          ]
                        }
                        target="_blank"
                      >
                        <IoGlobeOutline />{" "}
                      </a>
                    )}
                    {selectedHospital?.properties?.datasource?.raw[
                      "contact:phone"
                    ] && (
                      <a
                        className="badge"
                        href={
                          "tel:" +
                          selectedHospital?.properties?.datasource?.raw[
                            "contact:phone"
                          ]
                        }
                        target="_blank"
                      >
                        <MdPhone />{" "}
                      </a>
                    )}
                    {selectedHospital?.properties?.datasource?.raw["email"] && (
                      <a
                        className="badge"
                        href={
                          "mailto:" +
                          selectedHospital?.properties?.datasource?.raw["email"]
                        }
                        target="_blank"
                      >
                        <MdMail />{" "}
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-4 inline-flex gap-4 bg-green-600 text-white w-full justify-between">
                  <div className="text-4xl self-center">{medium.icon}</div>
                  <VR />
                  <div>
                    Distance
                    <p className="text-3xl font-bold">
                      {metersToKm(hospitalRoutes[0]?.distance)}
                    </p>
                  </div>
                  <VR />
                  <div>
                    Duration
                    <p className="text-3xl font-bold">
                      {secondsToHms(hospitalRoutes[0]?.duration)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        {/* <section className="absolute bottom-0 right-0 m-8 mr-3">
          {popupInfo && 
          <div className="">
              <h2>Map Info</h2>
              <label>Legend</label>
              <ul className="flex flex-col">
                <li className="inline-flex gap-2"><UserPin className="w-20"/> Your location</li>
                <li className="inline-flex gap-2"><HospitalPin/> Selected Hospital Location</li>
                <li className="inline-flex gap-2"><HospitalsPin/> Hospital</li>
              </ul>
            </div>
            }
          <button
            onClick={() => setPopupInfo(!popupInfo)}
            title={"Info"}
            key={`info`}
            className={`p-2 rounded-md w-fit text-2xl shadow-md text-black bg-white`}
          >
            <IoInformation />
          </button>
        </section> */}
        <Marker
          key={`viewport-location`}
          longitude={parseFloat(viewPort.longitude)}
          latitude={parseFloat(viewPort.latitude)}
          draggable={true}
          onDragEnd={(e) => {
            setViewPort((prev) => ({
              ...prev,
              longitude: e.lngLat.lng,
              latitude: e.lngLat.lat,
            }));
            setCurrentLocation({
              latitude: e.lngLat.lat,
              longitude: e.lngLat.lng,
            });
          }}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            bringMapToCenter([viewPort.longitude, viewPort.latitude]);
          }}
        >
          <UserPin />
        </Marker>

        {selectedHospital && (
          <Marker
            anchor="bottom"
            key={`selected-hospital-location-marker`}
            longitude={parseFloat(selectedHospital?.geometry?.coordinates[0])}
            latitude={parseFloat(selectedHospital?.geometry?.coordinates[1])}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              bringMapToCenter([viewPort.longitude, viewPort.latitude]);
            }}
          >
            <HospitalPin />
          </Marker>
        )}
        <GeolocateControl
          onGeolocate={(e) => {
            console.log(e);
            setCurrentLocation({
              latitude: e.coords.latitude,
              longitude: e.coords.longitude,
            });
            setViewPort((prev) => ({
              ...prev,
              latitude: e.coords.latitude,
              longitude: e.coords.longitude,
            }));
          }}
          positionOptions={{
            enableHighAccuracy: true,
          }}
          position="top-right"
        />
        <NavigationControl position="top-right" />
        <ScaleControl />

        {hospitalRoutes &&
          hospitalRoutes.map((route, index) => (
            <Source
              key={`route-${index}`}
              id={`route-${index}`}
              type="geojson"
              data={route.geometry}
            >
              <Layer {...routeLayer} />
            </Source>
          ))}

        {pins}
      </Map>
    </div>
  );
}

export default memo(HospitalMap);

{
  /* <button
          onClick={(e) => {
            e.preventDefault();
            const geolocateBtn = document.getElementsByClassName(
              "mapboxgl-ctrl-geolocate"
            );
            geolocateBtn[0].click();
          }}
          className="btn-small absolute top-0 right-0 m-4 z-10 w-max h-max"
        >
          <MdOutlineMyLocation /> Current Location
        </button> */
}
{
  /* <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
          ref={geolocatorRef}
          style={{
            display: "none",
          }}
        ></GeolocateControl> */
}
