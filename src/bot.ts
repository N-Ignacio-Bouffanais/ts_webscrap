import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
dotenv.config();

const token = process.env.TOKEN || '';
export const password = process.env.CHESS_PASSWORDS || '';
export const username = process.env.CHESS_EMAIL || '';
export const url = process.env.CHESS_URL || "";
export const bot = new Telegraf(token);