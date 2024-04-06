import React from "react";
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import WeatherPage from "components/page/WeatherPage";

const Router = () => {
  const routes = useRoutes([{ path: "", element: <WeatherPage /> }]);
  return routes;
};

export default Router;
