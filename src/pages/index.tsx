import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import TextBox from '@/components/textbox'
import { Heading, Stack } from '@chakra-ui/react'
import Result from '@/components/result'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Stack>
      <main className={styles.main}>
        <Heading>IMEI Checker</Heading>
        <p>携帯電話がネットワーク利用制限の対象か複数キャリアで同時にチェックします。</p>
        <TextBox />
      </main>
      </Stack>
    </>
  )
}
