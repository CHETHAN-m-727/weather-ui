import React, { useState, useEffect } from "react";
import geolocation from "geolocation";
import location from "../../image/location.png";
import Style from "./Location.module.scss";
import { tempWithlotAndLanApi } from "api/api.service";
import { useDispatch, useSelector } from "react-redux";
import { setTempResponseJson } from "Store/Project/ProjectSlice";

export const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const dispatch = useDispatch();

  const getLocation = () => {
    geolocation.getCurrentPosition((err, position) => {
      if (err) {
        console.error(err);
        return;
      }

      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  const fetchData = async () => {
    if (latitude && longitude) {
      try {
        const data = await tempWithlotAndLanApi(latitude, longitude);
        setResponseData(data.data);
        dispatch(setTempResponseJson(data.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [latitude, longitude]);

  const handleLocationClick = () => {
    fetchData();
  };

  console.log(responseData);

  return (
    <>
      <button className={Style.LocButton} onClick={getLocation}>
        <img
          className={Style.icon}
          src={location}
          onClick={handleLocationClick}
          alt="windy-dark logo"
        />
      </button>
    </>
  );
};

export default Location;
