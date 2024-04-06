import React, { useEffect, useState } from "react";
import style from "./Forcast.module.scss";
import { MdOutlineReadMore } from "react-icons/md";
import { LuWind } from "react-icons/lu";
import { IoMdCloudOutline } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { VscAccount } from "react-icons/vsc";
import { InputAdornment, TextField, debounce } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import { AccountCircle } from "@mui/icons-material";
import { tempApi, tempWithlotAndLanApi } from "api/api.service";
import { useDispatch } from "react-redux";
import { setTempResponseJson } from "Store/Project/ProjectSlice";

const getCurrentMonthAndYear = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();
  const monthName = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const dayName = days[currentDate.getDay()];
  const date = currentDate.getDate();
  const formattedDate = ("0" + date).slice(-2);
  const formattedMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth returns 0-indexed months
  const formattedYear = year;

  return `${monthName} ${year}`;
};
const getCurrentDateTime = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();
  const monthName = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const dayName = days[currentDate.getDay()];
  const date = currentDate.getDate();
  const formattedDate = ("0" + date).slice(-2);
  const formattedMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth returns 0-indexed months
  const formattedYear = year;

  return `${dayName} ${formattedDate}-${formattedMonth}-${formattedYear}`;
};
const Forcast = () => {
  const [searchQuery, setSearchQuery] = useState<any>("bangalore");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [placeholder, setPlaceholder] = useState("Search city...");
  const [data, setdata] = useState<any>({
    name: "",
    main: {
      temp: "",
      temp_min: "",
      temp_max: "",
      pressure: "",
      humidity: "",
      sea_level: "",
      grnd_level: "",
    },
    visibility: "",
    wind: {
      speed: "",
      deg: "",
      gust: "",
    },
    clouds: {
      all: "",
    },
    coord: {
      lon: "",
      lat: "",
    },
    weather: {
      id: "",
      main: "",
      description: "",
      icon: "",
    },
    base: "",
    sys: {
      country: "",
      sunrise: "",
      sunset: "",
    },
  });

  useEffect(() => {
    const debouncedSearch = debounce((query) => {
      tempApi(query)
        .then((_: any) => {
          console.log("temp data", _?.data);
          setdata(_?.data);
          dispatch(setTempResponseJson(_?.data));
        })
        .catch((err) => {
          alert(err.data);
        });
    }, 500);

    const timeoutId = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // For handling location changes
  useEffect(() => {
    console.log("Latitude:", latitude, "Longitude:", longitude);
    const palode = {
      latitude: latitude,
      longitude: longitude,
    };
    tempWithlotAndLanApi(palode)
      .then((_: any) => {
        console.log("longitude and latitude", _?.data);
        setdata(_?.data);
        dispatch(setTempResponseJson(_?.data));
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [latitude, longitude]);

  const handleSearchChange = (_: any) => {
    setSearchQuery(_.target.value);
  };

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };
  const handleClick = () => {
    getLocation();
    console.log("Latitude:", latitude, "Longitude:", longitude);
    const palode = {
      latitude: latitude,
      longitude: longitude,
    };
    tempWithlotAndLanApi(palode)
      .then((_: any) => {
        console.log("longitude and latitude", _?.data);
        setdata(_?.data);
        dispatch(setTempResponseJson(_?.data));
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <>
      <div className={style.forcast}>
        <div className={style.header}>
          <div className={style.date}>
            <p className={style.month}>{getCurrentMonthAndYear()}</p>
            <p>{getCurrentDateTime()}</p>
          </div>
          <div>
            <TextField
              id="standard-basic"
              //   label="search.."
              variant="standard"
              onChange={handleSearchChange}
              placeholder={searchQuery ? "" : "Search city..."}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={style.profile_notification}>
            <div>
              {" "}
              <MdMyLocation onClick={() => handleClick()} />
            </div>
            <div>
              <AccountCircleIcon />
              {/* <VscAccount /> */}
            </div>
          </div>
        </div>
        <hr />
        <div className={style.cityName}>
          <p className={style.city}>{data.name}</p>
          <div className={style.more}>
            <p>More</p>
            <MdOutlineReadMore />
          </div>
        </div>
        <div className={style.weather_overview}>
          <div className={style.wind}>
            <LuWind style={{ height: "100px", width: "30px" }} />
            <div className={style.wind_value}>
              <p>wind speed</p>
              <p>{data.wind?.speed || ""} km/hr</p>
            </div>
          </div>
          <div className={style.wind}>
            <IoMdCloudOutline style={{ height: "100px", width: "30px" }} />
            <div className={style.wind_value}>
              <p>Clouds</p>
              <p>{data.weather?.description || ""}</p>
            </div>
          </div>
          <div className={style.wind}>
            <WiHumidity style={{ height: "100px", width: "30px" }} />
            <div className={style.wind_value}>
              <p>Humidity</p>
              <p>{data.main?.humidity || ""} %</p>
            </div>
          </div>
          <div className={style.wind}>
            <LuWind style={{ height: "100px", width: "30px" }} />
            <div className={style.wind_value}>
              <p>Uv index</p>
              <p>10 km/hr</p>
            </div>
          </div>
        </div>
        <div className={style.Average_Weekly_temp}></div>
        <div> </div>
      </div>
    </>
  );
};

export default Forcast;
