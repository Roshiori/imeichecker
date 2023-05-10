const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  restriction: string;
}[];

export let sbrespondResult: string = " ";
export let aurespondResult: string = " ";
export let rmrespondResult: string = " ";

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const browser = await puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
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
    const [sbgetTag] = await page.$x(
      "/html/body/div[1]/table[2]/tbody/tr[2]/td/font"
    );

    const sbResult = await (
      await sbgetTag.getProperty("textContent")
    ).jsonValue();
    if (sbResult == "○") {
      sbrespondResult = "⚪︎";
    } else if (sbResult == "▲") {
      sbrespondResult = "△";
    } else if (sbResult == "×") {
      sbrespondResult = "×";
    } else if (sbResult == "－") {
      sbrespondResult = "-";
    }

    //au/UQ
    await page.goto("https://my.au.com/cmn/WCV009001/WCE009001.hc");
    await page.type('input[name="IMEI"]', req.body);
    await Promise.all([
      page.waitForNavigation({ waitUntil: "load" }),
      page.click('[name="次へ"]'),
    ]);

    let [augetTag] = await page.$x(
      "/html/body/div[1]/div[2]/div/div/div[2]/div[2]/div/div"
    );

    if (augetTag == null) {
      [augetTag] = await page.$x("/html/body/div[1]/div[2]/p");
    }

    const auResult = await (
      await augetTag.getProperty("textContent")
    ).jsonValue();
    if (auResult == "○") {
      aurespondResult = "⚪︎";
    } else if (auResult == "△") {
      aurespondResult = "△";
    } else if (auResult == "×") {
      aurespondResult = "×";
    } else if (auResult == "－") {
      aurespondResult = "-";
    } else {
      aurespondResult = "-";
    }

    //Rakuten
    await page.goto("https://network.mobile.rakuten.co.jp/restriction/");
    await page.type('input[name="imei"]', req.body);
    await Promise.all([
      page.waitForSelector("#search-result"),
      page.click("#search"),
    ]);

    const [rmgetTag] = await page.$x(
      "/html/body/div/div/section/div/main/div/ul/li[2]/dl/dd"
    );

    const rmResult = await (
      await rmgetTag.getProperty("textContent")
    ).jsonValue();

    if (rmResult == "⚪︎") {
      rmrespondResult = "⚪︎";
    } else if (rmResult == "△") {
      rmrespondResult = "△";
    } else if (rmResult == "×") {
      rmrespondResult = "×";
    } else if (rmResult == "-") {
      rmrespondResult = "-";
    }

    res.status(200).json([
      {
        restriction: sbrespondResult,
      },
      {
        restriction: aurespondResult,
      },
      {
        restriction: rmrespondResult,
      },
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
    res.status(200).end();
  }
};
