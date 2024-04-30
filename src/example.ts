import { chromium, Page } from "playwright";
import { bot, password, username } from "./bot";

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

async function runScraper() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await authenticate(page, username, password);
  const data = await scrapeData(page);
  console.log(data);
  await browser.close();
}

bot.start(async (ctx) => {
  ctx.reply("Iniciando...");
  runScraper();
});

bot.command("robots", async (ctx) => {
  ctx.reply("Cargando datos...");
});

bot.command("stop", async (ctx) => {
  ctx.reply("Deteniendo el sistema...");
  bot.stop();
});

bot.launch();
