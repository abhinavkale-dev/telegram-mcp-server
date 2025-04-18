import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set in .env");
}

const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface TelegramResponse<T> {
  ok: boolean;
  result: T;
}

export async function sendMessage(chatId: number, text: string) {
  const res = await axios.post<TelegramResponse<any>>(
    `${API_BASE}/sendMessage`,
    { chat_id: chatId, text }
  );
  return res.data.result;
}

export async function sendPhoto(chatId: number, photoUrl: string, caption?: string) {
  const res = await axios.post<TelegramResponse<any>>(
    `${API_BASE}/sendPhoto`,
    { chat_id: chatId, photo: photoUrl, caption }
  );
  return res.data.result;
}

export async function deleteMessage(chatId: number, messageId: number) {
  const res = await axios.post<TelegramResponse<any>>(
    `${API_BASE}/deleteMessage`,
    { chat_id: chatId, message_id: messageId }
  );
  return res.data.ok;
} 