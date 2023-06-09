import {
  Button,
  Input,
  Stack,
  Text,
  withDefaultVariant,
} from "@chakra-ui/react";
import React from "react";
import Result from "./result";

/*import {
  sbrespondResult,
  aurespondResult,
  rmrespondResult,
} from "api/getrestrictionvalue";*/

export const SbContext = React.createContext("");
export const AuContext = React.createContext("");
export const RmContext = React.createContext("");
let validate: boolean = false;
let display: string = "";

const TextBox = () => {
  const [imeiNum, setImeiNum] = React.useState("");
  const [sbstate, setSbstate] = React.useState("N/A");
  const [austate, setAustate] = React.useState("N/A");
  const [rmstate, setRmstate] = React.useState("N/A");

  const submitIMEI = async () => {
    const paramIMEI = {
      imei: imeiNum,
    };
    fetch("/api/getrestrictionvalue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramIMEI.imei),
    })
      .then((res) => {
        console.log(
          res.json().then((data) => {
            console.log(data);
            setSbstate(data[0].restriction);
            setAustate(data[1].restriction);
            setRmstate(data[2].restriction);
          })
        );
        console.log(res.body);
      })
      .catch((error) => console.log(error));
  };

  if (imeiNum.length < 15 || imeiNum.length > 15) {
    validate = false;
    display = "";
  } else if (imeiNum.length == 15) {
    if (isNaN(Number(imeiNum))) {
      validate = false;
      display = "";
    } else {
      validate = true;
      display = "none";
    }
  }

  return (
    <>
      <SbContext.Provider value={sbstate}>
        <AuContext.Provider value={austate}>
          <RmContext.Provider value={rmstate}>
            <Stack>
              <Input
                placeholder="IMEI(製造番号)を入力"
                value={imeiNum}
                onChange={(e) => setImeiNum(e.target.value)}
              />
              <Button onClick={submitIMEI} isDisabled={validate == false}>
                確認
              </Button>
              <Text>IMEI: {imeiNum}</Text>
              <Text color="red" display={display}>
                IMEIを15桁の半角数字で入力してください
              </Text>
              <Result />
            </Stack>
          </RmContext.Provider>
        </AuContext.Provider>
      </SbContext.Provider>
    </>
  );
};

export default TextBox;
