import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set in .env file");
}

const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

const server = new McpServer({
  name: "telegram",
  version: "0.1.0",
  description: "A simple MCP server for Telegram",
});


async function sendTelegramMessage(chatId: string | number, text: string) {
  try {
    const response = await axios.post(`${API_BASE}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: "Markdown"
    });
    
    return { 
      success: true,
      message_id: (response.data as any)?.result?.message_id || 0 
    };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message 
    };
  }
}

async function sendTelegramPhoto(chatId: string | number, photoUrl: string, caption?: string) {
  try {
    const response = await axios.post(`${API_BASE}/sendPhoto`, {
      chat_id: chatId,
      photo: photoUrl,
      caption,
      parse_mode: "Markdown"
    });
    
    return { 
      success: true,
      message_id: (response.data as any)?.result?.message_id || 0 
    };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message 
    };
  }
}

server.tool(
  "sendMessage",
  "Send a message to a Telegram chat",
  {
    chatId: z.union([z.string(), z.number()]).describe("The chat ID to send the message to"),
    text: z.string().describe("The message text to send")
  },
  async ({ chatId, text }) => {
    try {
      const result = await sendTelegramMessage(String(chatId), text);
      
      if (!result.success) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${result.error}`
            }
          ]
        };
      }
      
      return {
        content: [
          {
            type: "text",
            text: `Message sent! ID: ${result.message_id}`
          }
        ]
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Unexpected error: ${error.message}`
          }
        ]
      };
    }
  }
);

server.tool(
  "sendPhoto",
  "Send a photo to a Telegram chat",
  {
    chatId: z.union([z.string(), z.number()]).describe("The chat ID to send the photo to"),
    photoUrl: z.string().describe("URL of the photo to send"),
    caption: z.string().optional().describe("Optional caption for the photo")
  },
  async ({ chatId, photoUrl, caption }) => {
    try {
      const result = await sendTelegramPhoto(String(chatId), photoUrl, caption);
      
      if (!result.success) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${result.error}`
            }
          ]
        };
      }
      
      return {
        content: [
          {
            type: "text",
            text: `Photo sent! ID: ${result.message_id}`
          }
        ]
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Unexpected error: ${error.message}`
          }
        ]
      };
    }
  }
);

async function deleteTelegramMessage(chatId: string | number, messageId: number) {
  try {
    const response = await axios.post<{ok: boolean}>(`${API_BASE}/deleteMessage`, {
      chat_id: chatId,
      message_id: messageId
    });
    
    return { 
      success: true,
      result: response.data.ok 
    };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message 
    };
  }
}

server.tool(
  "deleteMessage",
  "Delete a message from a Telegram chat",
  {
    chatId: z.union([z.string(), z.number()]).describe("The chat ID where the message is"),
    messageId: z.number().describe("The message ID to delete")
  },
  async ({ chatId, messageId }) => {
    try {
      const result = await deleteTelegramMessage(String(chatId), messageId);
      
      if (!result.success) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${result.error}`
            }
          ]
        };
      }
      
      return {
        content: [
          {
            type: "text",
            text: `Message deleted successfully!`
          }
        ]
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Unexpected error: ${error.message}`
          }
        ]
      };
    }
  }
);

async function main() {
  try {
    const transport = new StdioServerTransport();
    
    await server.connect(transport);
  } catch (error: any) {
    console.error('Error starting Telegram server:', error.message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error.message);
  process.exit(1);
}); 