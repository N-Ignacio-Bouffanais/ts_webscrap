import { Page } from "playwright";
import { bot } from "./bot";

export const authenticate = async (
  page: Page,
  username: string,
  password: string
): Promise<void> => {
  await page.goto("http://10.115.43.118:3008/il/grafana/login");
  await page.getByLabel("Username input field").fill(username);
  await page.getByLabel("Password input field").fill(password);
  await page.getByLabel("Login button").click();
  // await page.waitForURL("http://10.115.43.118:3008/il/grafana/?orgId=1");
  // await page.goto("http://10.115.43.118:3008/il/grafana/d/sDmADcSIk/mle-flr?orgId=1&refresh=30s")
};

async function scrapeData(page: Page): Promise<any[]> {
  await page.goto(
    "http://10.115.43.118:3008/il/grafana/d/sDmADcSIk/mle-flr?orgId=1&refresh=30s"
  );
  await page.waitForSelector(".css-1xodasp");
  const data = await page.evaluate(() => {
    const elements = document.querySelectorAll(".css-1xodasp");
    return Array.from(elements).map((element) => ({
      title: element.querySelector("span")?.textContent,
    }));
  });
  return data;
}

bot.launch();
