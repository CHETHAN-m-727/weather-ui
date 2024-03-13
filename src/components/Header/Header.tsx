import React from "react";
import Style from "./Header.module.scss";
import { IconButton, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  return (
    <div className={Style.header}>
      <h2 className={Style.title}>Weather </h2>
      <div className={Style.menuButton}>
        <Tooltip title="menu">
          <IconButton className={Style.menuButton}>
            <MenuIcon
              sx={{
                fontSize: "40px",
                color: "white",
                alignItems: "end",
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
