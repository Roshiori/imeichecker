import * as puppeteer from "puppeteer-core";
import { executablePath } from "puppeteer-core";
const chromium = require("chrome-aws-lambda");
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  sbrestriction: number;
  aurestriction: number;
  rmrestriction: number;
}[];

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const browser = await puppeteer.launch({
    channel: "chrome",
    headless: false,
  });
  const page = await browser.newPage();
  try {
    //SoftBank/Y!
    await page.goto("https://ct99.my.softbank.jp/WBF/icv");
    await page.type('input[name="imei"]', req.body);
    await Promise.all([
      page.waitForNavigation({ waitUntil: "load" }),
      page.click('[name="ACT_TE001"]'),
    ]);
    let sbrespondResult: number = 0;
    const [sbgetTag] = await page.$x(
      "/html/body/div[1]/table[2]/tbody/tr[2]/td/font"
    );

    const sbResult = await (
      await sbgetTag.getProperty("textContent")
    ).jsonValue();
    console.log(sbResult);
    if (sbResult == "⚪︎") {
      sbrespondResult = 1;
    } else if (sbResult == "▲") {
      sbrespondResult = 2;
    } else if (sbResult == "×") {
      sbrespondResult = -1;
    } else if (sbResult == "－") {
      sbrespondResult = 3;
    }
    console.log(sbrespondResult);

    //au/UQ
    await page.goto("https://my.au.com/cmn/WCV009001/WCE009001.hc");
    await page.type('input[name="IMEI"]', req.body);
    await Promise.all([
      page.waitForNavigation({ waitUntil: "load" }),
      page.click('[name="次へ"]'),
    ]);
    let aurespondResult: number = 0;
    let [augetTag] = await page.$x(
      "/html/body/div[1]/div[2]/div/div/div[2]/div[2]/div/div"
    );
    if ([augetTag == null]) {
      [augetTag] = await page.$x("/html/body/div[1]/div[2]/p");
    }

    const auResult = await (
      await augetTag.getProperty("textContent")
    ).jsonValue();
    console.log(auResult);
    if (auResult == "⚪︎") {
      aurespondResult = 1;
    } else if (auResult == "△") {
      aurespondResult = 2;
    } else if (auResult == "×") {
      aurespondResult = -1;
    } else if (auResult == "－") {
      aurespondResult = 3;
    } else {
      aurespondResult = 3;
    }
    console.log(aurespondResult);

    //Rakuten
    await page.goto("https://network.mobile.rakuten.co.jp/restriction/");
    await page.type('input[name="imei"]', req.body);
    await Promise.all([
      page.waitForSelector("#search-result"),
      page.click("#search"),
    ]);
    let rmrespondResult: number = 0;
    const [rmgetTag] = await page.$x(
      "/html/body/div/div/section/div/main/div/ul/li[2]/dl/dd"
    );

    const rmResult = await (
      await rmgetTag.getProperty("textContent")
    ).jsonValue();
    console.log(rmResult);
    if (rmResult == "⚪︎") {
      rmrespondResult = 1;
    } else if (rmResult == "△") {
      rmrespondResult = 2;
    } else if (rmResult == "×") {
      rmrespondResult = -1;
    } else if (rmResult == "-") {
      rmrespondResult = 3;
    }
    console.log(rmrespondResult);

    res.status(200).json([
      {
        sbrestriction: sbrespondResult,
        aurestriction: aurespondResult,
        rmrestriction: rmrespondResult,
      },
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
    res.status(200).end();
  }
};
