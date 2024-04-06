import React from "react";
import style from "./WeatherPage.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Forcast from "components/forcast/Forcast";

const WeatherPage = () => {
  return (
    <>
      <div className={style.weatherPage}>
        <div className={style.Sidebar}>
          {" "}
          <Sidebar />
        </div>
        <div className={style.Forcast}>
          <Forcast />
        </div>
      </div>
    </>
  );
};

export default WeatherPage;
