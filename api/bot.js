import path from 'path';

import commandDirectory from '../commands/directory.json';
import TelegramBot from 'telegram-bot-api';

const { TELEGRAM_TOKEN } = process.env;

export default async (req, res) => {
    const bot = new TelegramBot({ token: TELEGRAM_TOKEN });
    const incoming = JSON.parse(req.body);

    if (incoming.message) {
        const { chat: { id }, text } = incoming.message;
        const [commandName, commandData] = text.split(' ', 1);
        if (commandDirectory[commandName]) {
            const commandFunction = require(path.resolve(__dirname, `../commands${commandDirectory[commandName]}`)).default;
            const commandResponse = await commandFunction({ rawMessage: incoming.message, commandName, commandData });
            await bot.sendMessage(id, commandResponse, { parse_mode: 'Markdown' });
        } else {
            await bot.sendMessage(id, '🛑 Error: Unknown command');
        }
    }

    res.send('OK');
};