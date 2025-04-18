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

## Supported Operations

The Telegram MCP server supports the following operations:

- **sendMessage**: Send a text message to a chat
- **getUpdates**: Get updates (new messages, etc.) from Telegram
- **sendPhoto**: Send a photo with optional caption to a chat
- **getChat**: Get information about a specific chat
- **deleteMessage**: Delete a message from a chat

## Usage Example

The server implements the Model Context Protocol, so it can be used with any MCP-compatible client. Here's an example call format:

```json
{
  "operation": "sendMessage",
  "chatId": 123456789,
  "text": "Hello from the Telegram MCP Server!"
}
```

## Implementation Details

This server uses:
- The Model Context Protocol SDK
- Telegram Bot API
- TypeScript

## License

MIT 