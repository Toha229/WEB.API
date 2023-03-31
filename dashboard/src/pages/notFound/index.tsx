import React from "react";
import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { Link } from "react-router-dom";

const primary = "#03a9f4"; // #f

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Link to="/">Back Home</Link>
    </Box>
  );
};

export default NotFound;
