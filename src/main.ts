import { FastMCP } from "fastmcp";
import { z } from "zod";
import {
  sendMessage,
  getUpdates,
  sendPhoto,
  getChat,
  deleteMessage
} from "./telegram.js";

const mcp = new FastMCP({ name: "telegram", version: "0.1.0" });

mcp.addTool({
  name: "sendMessage",
  description: "Send a message to a chat",
  parameters: z.object({
    chatId: z.number(),
    text: z.string()
  }),
  execute: async (args) => {
    return await sendMessage(args.chatId, args.text);
  }
});

mcp.addTool({
  name: "getUpdates",
  description: "Get updates from Telegram",
  parameters: z.object({
    offset: z.number().optional(),
    limit: z.number().optional().default(10)
  }),
  execute: async (args) => {
    return await getUpdates(args.offset, args.limit);
  }
});

mcp.addTool({
  name: "sendPhoto",
  description: "Send a photo to a chat",
  parameters: z.object({
    chatId: z.number(),
    photoUrl: z.string(),
    caption: z.string().optional()
  }),
  execute: async (args) => {
    return await sendPhoto(args.chatId, args.photoUrl, args.caption);
  }
});

mcp.addTool({
  name: "getChat",
  description: "Get information about a chat",
  parameters: z.object({
    chatId: z.number()
  }),
  execute: async (args) => {
    return await getChat(args.chatId);
  }
});

mcp.addTool({
  name: "deleteMessage",
  description: "Delete a message",
  parameters: z.object({
    chatId: z.number(),
    messageId: z.number()
  }),
  execute: async (args) => {
    const result = await deleteMessage(args.chatId, args.messageId);
    return String(result);
  }
});

mcp.start({ transportType: "stdio" }); 