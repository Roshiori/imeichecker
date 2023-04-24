import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import TextBox from "@/components/textbox";
import { Heading, Stack } from "@chakra-ui/react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Description from "@/components/description";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <Stack>
          <main>
            <p>
              携帯電話がネットワーク利用制限の対象か複数キャリアで同時にチェックします。
            </p>
            <TextBox />
            <Description />
          </main>
        </Stack>
      </div>
      <Footer/>
    </>
  );
}
