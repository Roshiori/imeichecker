import React from "react";
import Styles from "../styles/header.module.css";
import { Box, Heading, Stack } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
    <Box boxShadow="md">
      <header className={Styles.main}>
        <Box>
          <Heading as = "h2" size="2xl" color="white" >IMEI Checker</Heading>
        </Box>
      </header>
      </Box>
    </>
  );
};

export default Header;
