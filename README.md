# Telegram MCP Server

A Model Context Protocol server for the Telegram Bot API, allowing AI assistants to interact with Telegram using standardized tools.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with your Telegram Bot Token:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```

3. Build the TypeScript project:
   ```
   npm run build
   ```

4. Start the server:
   ```
   npm start
   ```

## MCP Client Configuration

To use this server with an MCP client, add the following configuration to your MCP client's config file:

```json
{
  "mcpServers": {
    "telegram": {
      "command": "node",
      "args": ["path/to/telegram-mcp-server/dist/telegram-mcp.js"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "your_bot_token_here"
      }
    }
  }
}
```

## Supported Operations

The Telegram MCP server supports the following operations:

- **sendMessage**: Send a text message to a chat
- **sendPhoto**: Send a photo with optional caption to a chat
- **deleteMessage**: Delete a message from a chat

## Usage Example

The server implements the Model Context Protocol, so it can be used with any MCP-compatible client. Here are some example call formats:


###Send a message
```json
{
  "operation": "sendMessage",
  "chatId": 123456789,
  "text": "Hello from the Telegram MCP Server!"
}
```

###Send a photo
```json
{
  "operation": "sendPhoto",
  "chatId": 123456789,
  "photoUrl": "https://example.com/image.jpg",
  "caption": "Check out this photo!"
}
```
###Delete a message
```json
{
  "operation": "deleteMessage",
  "chatId": 123456789,
  "messageId": 987654321
}
```

## Implementation Details

This server uses:
- The Model Context Protocol SDK
- Telegram Bot API
- TypeScript
