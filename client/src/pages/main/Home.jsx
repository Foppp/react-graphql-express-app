import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Navbar.jsx";
import Content from "./Content.jsx";


const Home = () => {

  return (
    <>
    <Box>
      <CssBaseline />
      <Navbar  />
      <Content />
      </Box>
      </>
  );
};

export default Home;
