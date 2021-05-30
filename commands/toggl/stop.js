import { getToken, getCurrentTimeEntry, stopTimeEntry } from '../../services/toggl';

export default async ({ chatId, commandData }) => {
    const token = getToken(chatId);
    const timeEntry = await getCurrentTimeEntry(token);
    await stopTimeEntry(token);

    if (result.error) {
        return `🛑 Something went wrong: ${result.error}`;
    } else {
        const duration = new Date() + new Date(timeEntry.start) / 86400000 * 60;
        return `✅ You are done working on: *${commandData}*. Time logged: ${duration.toFixed(2)} hours.`;
    }
}