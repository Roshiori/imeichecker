import React from "react";
import { Stack } from "@chakra-ui/react";
import ResultCard from "./resultcard";
import { SbContext, AuContext, RmContext } from "./textbox";

const Result = () => {
    const SbContextValue = React.useContext(SbContext);
    const AuContextValue = React.useContext(AuContext);
    const RmContextValue = React.useContext(RmContext);
  return (
    <>
      <Stack>
        <ResultCard carrer="SoftBank/Y!mobile" status={SbContextValue} />
        <ResultCard carrer="au/UQ mobile" status={AuContextValue} />
        <ResultCard carrer="楽天モバイル" status={RmContextValue} />
      </Stack>
    </>
  );
};

export default Result;
