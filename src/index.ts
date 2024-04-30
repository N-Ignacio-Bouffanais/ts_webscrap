import { Page, chromium } from "playwright";
import { bot, password, username, url } from "./bot";

bot.command(["dafiti","Dafiti","DAFITI"], async (ctx) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.getByLabel("Username or Email").fill(username);
  await page.getByLabel("Password").fill(password);
  const buttonByName = page.locator("#login");
  await buttonByName.click();
  // AWAIT for the page and take the screenshot
  await page.goto("https://www.chess.com/today");
  const buffer = await page.screenshot({ fullPage: true });
  const base64String = buffer.toString("base64");
  ctx.sendMessage("Cargando imagen...")
  ctx.replyWithPhoto({ source: Buffer.from(base64String, "base64") });
  
  await browser.close();
})

bot.command(["Bots","bots","BOTS"], async (ctx) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.getByLabel("Username or Email").fill(username);
  await page.getByLabel("Password").fill(password);
  const buttonByName = page.locator("#login");
  await buttonByName.click();
  await page.goto("");
  const nbots = await page.getByText("")

  ctx.sendMessage("Ahora hay: " + nbots)
  await browser.close();
})


bot.command(["tareas","Tareas","TAREAS"], async(ctx)=>{
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.getByLabel("Username or Email").fill(username);
  await page.getByLabel("Password").fill(password);
  const buttonByName = page.locator("#login");
  await buttonByName.click();
  await page.goto("");
  const tasks = await page.getByText("");
  ctx.sendMessage("Ahora hay: " + tasks);
  await browser.close();
})

//Iniciar el bot
bot.launch()