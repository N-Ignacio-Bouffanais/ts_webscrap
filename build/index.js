"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const playwright_1 = require("playwright");
const bot_1 = require("./bot");
const authenticate = (page, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto("http://10.115.43.118:3008/il/grafana/login");
    yield page.getByLabel("Username input field").fill(username);
    yield page.getByLabel("Password input field").fill(password);
    yield page.getByLabel("Login button").click();
    // await page.waitForURL("http://10.115.43.118:3008/il/grafana/?orgId=1");
    // await page.goto("http://10.115.43.118:3008/il/grafana/d/sDmADcSIk/mle-flr?orgId=1&refresh=30s")
});
exports.authenticate = authenticate;
function scrapeData(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.goto("http://10.115.43.118:3008/il/grafana/d/sDmADcSIk/mle-flr?orgId=1&refresh=30s");
        yield page.waitForSelector(".css-1xodasp");
        const data = yield page.evaluate(() => {
            const elements = document.querySelectorAll(".css-1xodasp");
            return Array.from(elements).map((element) => {
                var _a;
                return ({
                    title: (_a = element.querySelector("span")) === null || _a === void 0 ? void 0 : _a.textContent,
                });
            });
        });
        return data;
    });
}
function runScraper() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield playwright_1.chromium.launch();
        const page = yield browser.newPage();
        yield (0, exports.authenticate)(page, bot_1.username, bot_1.password);
        const data = yield scrapeData(page);
        console.log(data);
        yield browser.close();
    });
}
bot_1.bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.reply("Iniciando...");
    runScraper();
}));
bot_1.bot.command("robots", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.reply("Cargando datos...");
}));
bot_1.bot.command("stop", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.reply("Deteniendo el sistema...");
    bot_1.bot.stop();
}));
bot_1.bot.launch();
