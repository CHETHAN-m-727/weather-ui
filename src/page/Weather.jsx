import { Header } from "../components/Header/Header";
import React from "react";
import Style from "./Weather.module.scss";
import Footer from "../components/Footer/Footer";
import WeatherCard from "../components/WeatherCard/WeatherCard";

const Weather = () => {
  return (
    <div className={Style.WeatherBody}>
      <Header />
      <WeatherCard />
      <Footer />
    </div>
  );
};

export default Weather;
