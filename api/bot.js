import path from 'path';

import commandDirectory from '../commands/directory.json';
import TelegramBot from 'telegram-bot-api';

const { TELEGRAM_TOKEN } = process.env;

export default async (req, res) => {
    const bot = new TelegramBot({ token: TELEGRAM_TOKEN });
    const incoming = req.body;

    if (incoming.message) {
        const { chat: { id }, text } = incoming.message;
        const commandName = text.split(' ').shift().toLowerCase();
        try {
            if (commandDirectory[commandName]) {
                const commandData = text.substr(commandName.length + 2);
                const commandFunction = require(path.resolve(__dirname, `../commands/${commandDirectory[commandName]}`)).default;
                const commandResponse = await commandFunction({ bot, rawMessage: incoming.message, commandName, commandData });
                await bot.sendMessage({ chat_id: id, text: commandResponse, parse_mode: 'Markdown' });
            } else {
                await bot.sendMessage(id, '🛑 Error: Unknown command');
            }
        } catch (e) {
            await bot.sendMessage({ chat_id: id, text: `🛑 Failed to respond - ${e.message} - ${e.stack}` });
        }
    }

    res.send('OK');
};