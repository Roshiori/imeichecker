import React from "react";
import Styles from "../styles/footer.module.css";
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsTwitter, BsGithub } from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
  const yearNum: number = new Date().getFullYear();
  const year: string = yearNum.toString();

  return (
    <>
      <footer className={Styles.main}>
        <VStack>
          <Text as = "b">© {year} Roshiori. All Rights Reserved.</Text>
          <Center>
            <HStack>
              <Link href="https://twitter.com/Roshiori">
                <IconButton colorScheme="blue" aria-label="Twitter" icon={<BsTwitter />} />
              </Link>
              <Link href="https://github.com/Roshiori">
                <IconButton aria-label="GitHub" icon={<BsGithub />} />
              </Link>
            </HStack>
          </Center>
        </VStack>
      </footer>
    </>
  );
};

export default Footer;
