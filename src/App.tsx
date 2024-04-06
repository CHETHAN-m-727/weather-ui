import React from "react";
import Style from "./App.module.scss";
import Router from "components/Router/Router";

function App() {
  return (
    <div className={Style.App}>
      <Router />
    </div>
  );
}

export default App;
