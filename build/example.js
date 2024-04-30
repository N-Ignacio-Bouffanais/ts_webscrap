"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const playwright_1 = require("playwright");
const bot_1 = require("./bot");
const authenticate = async (page, username, password) => {
    await page.goto("http://10.115.43.118:3008/il/grafana/login");
    await page.getByLabel("Username input field").fill(username);
    await page.getByLabel("Password input field").fill(password);
    await page.getByLabel("Login button").click();
    // await page.waitForURL("http://10.115.43.118:3008/il/grafana/?orgId=1");
    // await page.goto("http://10.115.43.118:3008/il/grafana/d/sDmADcSIk/mle-flr?orgId=1&refresh=30s")
};
exports.authenticate = authenticate;
async function scrapeData(page) {
    await page.goto("http://10.115.43.118:3008/il/grafana/d/sDmADcSIk/mle-flr?orgId=1&refresh=30s");
    await page.waitForSelector(".css-1xodasp");
    const data = await page.evaluate(() => {
        const elements = document.querySelectorAll(".css-1xodasp");
        return Array.from(elements).map((element) => {
            var _a;
            return ({
                title: (_a = element.querySelector("span")) === null || _a === void 0 ? void 0 : _a.textContent,
            });
        });
    });
    return data;
}
async function runScraper() {
    const browser = await playwright_1.chromium.launch();
    const page = await browser.newPage();
    await (0, exports.authenticate)(page, bot_1.username, bot_1.password);
    const data = await scrapeData(page);
    console.log(data);
    await browser.close();
}
bot_1.bot.start(async (ctx) => {
    ctx.reply("Iniciando...");
    runScraper();
});
bot_1.bot.command("robots", async (ctx) => {
    ctx.reply("Cargando datos...");
});
bot_1.bot.command("stop", async (ctx) => {
    ctx.reply("Deteniendo el sistema...");
    bot_1.bot.stop();
});
bot_1.bot.launch();
