import React from "react";
import style from "./Sidebar.module.scss";
import logo from "../../assets/image/logo.jpeg";
import { MdDashboard } from "react-icons/md";
import { FaMap } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { BsGearFill } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const tempData = useSelector((state: any) => state.project.tempResponseJson);
  console.log("tempData", tempData);
  return (
    <div className={style.Sidebar}>
      <div className={style.wrapper}>
        <div className={style.logo}>
          <img className={style.logo_img} src={logo} alt="logo" />
          <p>Weather app</p>
        </div>
        <hr />

        <div className={style.temp}>{tempData?.main?.temp || ""} °C</div>
        <hr style={{ margin: "40px", marginTop: "0px" }} />
        <div className={style.dashboard}>
          <MdDashboard />
          Dashboard
        </div>
        <div className={style.map}>
          <FaMap />
          Map
        </div>
        <div className={style.location}>
          <FaMapLocation />
          Saved Location
        </div>
        <div className={style.calendar}>
          <FaCalendarDays />
          Calendar
        </div>
        {/* <div className={style.system}>
          <hr />
          <p>System</p>
          <div className={style.sitteng}>
            <BsGearFill />
            Sitteng
          </div>
          <div className={style.logout}>
            <CgLogOut />
            Logout
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
