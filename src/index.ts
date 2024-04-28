import { chromium, Page } from "playwright"
import { bot, password, username, url } from "./bot"

export const authenticate = async (page:Page, username:string, password: string):Promise<void> => {
  await page.goto(url)
}