import fetch from 'node-fetch';
import { login } from '../../services/toggl';

const tokens = {};

export default async ({ rawMessage, commandData }) => {
    const chatId = rawMessage.chat.id;
    
    const result = await login(commandData);
    if (result.error) {
        return 'Invalid token';
    } else {
        tokens[chatId] = commandData;
        return `Toggl says hi, **${result.name}**!`;
    }
}