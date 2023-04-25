import * as puppeteer from "puppeteer-core";
import { executablePath } from "puppeteer-core";
const chromium = require("chrome-aws-lambda");
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const browser = await puppeteer.launch({ channel: "chrome" });
  const page = await browser.newPage();
  try {
    await page.goto("https://ct99.my.softbank.jp/WBF/icv");
    const inputIMEI = await page.type('input[name="imei"]', req.body);
    const submitIMEI = await Promise.all([
      page.waitForNavigation({ waitUntil: "load" }),
      page.click('[name="ACT_TE001"]'),
    ]);
    let respondResult: number = 0;
    const [getTag] = await page.$x(
      '/html/body/div/table/tr/td/font[contains(@size, "8")]'
    );

    const sbResult = await getTag.getProperty("textContent");

    if (sbResult == '<font size="8" color="#666666">○</font>') {
      respondResult = 1;
    } else if (getTag == '<font size="8" color="#666666">○</font>') {
      respondResult = 2;
    } else if (getTag == '<font size="8" color="#666666">○</font>') {
      respondResult = -1;
    } else if (getTag == '<font size="8" color="#666666">○</font>') {
      respondResult = 4;
    }
    console.log(respondResult);
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
    res.status(200).end();
  }
};
