import React from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export const IconHome = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate("/")}
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        zIndex: 1000,
      }}
    >
      <HomeIcon style={{ fontSize: "32px" }} />
    </IconButton>
  );
};
