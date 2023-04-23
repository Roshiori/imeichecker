import { Button, Input, withDefaultVariant } from "@chakra-ui/react";
import React from "react";
import Result from "./result";

export const SbContext = React.createContext("");
export const AuContext = React.createContext("");
export const RmContext = React.createContext("");

const TextBox = () => {
  const [imeiNum, setImeiNum] = React.useState("");
  const [sbstate, setSbstate] = React.useState("N/A");
  const [austate, setAustate] = React.useState("N/A");
  const [rmstate, setRmstate] = React.useState("N/A");

  const submitIMEI = () => {
    setSbstate("まる");
  };

  return (
    <>
      <SbContext.Provider value={sbstate}>
        <AuContext.Provider value={austate}>
          <RmContext.Provider value={rmstate}>
            <Input
              placeholder="IMEI(製造番号)を入力"
              value={imeiNum}
              onChange={(e) => setImeiNum(e.target.value)}
            />
            <Button onClick={submitIMEI}>確認</Button>
            <p>IMEI: {imeiNum}</p>
            <Result/>
          </RmContext.Provider>
        </AuContext.Provider>
      </SbContext.Provider>
    </>
  );
};

export default TextBox;
