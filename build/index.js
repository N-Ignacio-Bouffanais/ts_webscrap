"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
const bot_1 = require("./bot");
// bot.command(["dafiti", "Dafiti", "DAFITI"],async (ctx) => {
//   const browser = await chromium.launch()
//   const page = await browser.newPage();
//   await page.goto("http://10.115.43.118:3008/il/grafana/login");
//   await page.getByLabel("Username input field").fill(username);
//   await page.getByLabel("Password input field").fill(password);
//   await page.getByLabel("Login button").click();
//   // AWAIT for the page and take the screenshot
//   await page.waitForURL("http://10.115.43.118:3008/il/grafana/?orgId=1");
//   await page.goto("http://10.115.43.118:3008/il/grafana/d/sDmADcSIk/mle-flr?orgId=1&refresh=30s")
// });
bot_1.bot.command(["dafiti", "Dafiti", "DAFITI"], async (ctx) => {
    const browser = await playwright_1.chromium.launch();
    const page = await browser.newPage();
    await page.goto(bot_1.url);
    await page.getByLabel("Username or Email").fill(bot_1.username);
    await page.getByLabel("Password").fill(bot_1.password);
    const buttonByName = page.locator("#login");
    await buttonByName.click();
    // AWAIT for the page and take the screenshot
    await page.goto("https://www.chess.com/today");
    const buffer = await page.screenshot({ fullPage: true });
    const base64String = buffer.toString("base64");
    ctx.sendMessage("funciona");
    ctx.replyWithPhoto({ source: Buffer.from(base64String, "base64") });
    await browser.close();
});
//Iniciar el bot
bot_1.bot.launch();
