import { login, saveToken } from '../../services/toggl';

export default async ({ chatId, commandData }) => {
    const result = await login(commandData);

    if (result.error) {
        return 'Invalid token ```' + result.error + '```';
    } else {
        saveToken(chatId, commandData);
        return `Toggl says hi, *${result.name}*!`;
    }
}