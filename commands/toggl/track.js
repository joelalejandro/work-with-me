import { getToken, startTimeEntry } from '../../services/toggl';

export default async ({ chatId, commandData }) => {
    const token = getToken(chatId);
    const result = await startTimeEntry(commandData, token);

    if (result.error) {
        return `🛑 Something went wrong: ${result.error}`;
    } else {
        return `⏲ Started tracking: ${commandData}`;
    }
}