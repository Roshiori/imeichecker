import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

type propsType = {
  carrer: string;
  status: string;
};

const ResultCard = (props: propsType) => {
  return (
    <>
      <Card>
        <CardBody>
          <Stack>
            <Heading size="md">{props.carrer}</Heading>
            <Text as = "b">{props.status}</Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default ResultCard;
