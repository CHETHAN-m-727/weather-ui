import Weather from "page/Weather";
import React from "react";
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";

const Router = () => {
  const routes = useRoutes([{ path: "", element: <Weather /> }]);
  return routes;
};

export default Router;
