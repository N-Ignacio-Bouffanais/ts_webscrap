import { Context, Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
dotenv.config();

const token = process.env.TOKEN || '';

export const bot = new Telegraf(token)
export const password = process.env.PASSWORDS || '';
export const username = process.env.USERNAME || '';
export const url = process.env.URL || '';