import React from "react";
import { Card, CardBody } from "@chakra-ui/react";

type propsType = {
    carrer: string;
    status: string;
}

const ResultCard = (props: propsType) => {
  return (
    <>
      <Card>
        <CardBody>
            <p>{props.carrer}</p>
            <p>{props.status}</p>
        </CardBody>
      </Card>
    </>
  );
};

export default ResultCard;
