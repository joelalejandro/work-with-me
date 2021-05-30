import { getToken, getCurrentTimeEntry } from '../../services/toggl';

export default async ({ chatId, commandData }) => {
    const token = getToken(chatId);
    const result = await getCurrentTimeEntry(token);

    if (result.error) {
        return `🛑 Something went wrong: ${result.error}`;
    } else {
        if (!result.start) {
            return `🤷‍♂️ I don't know what you're doing, maybe start tracking with /toggl_track?`;
        }
        
        const duration = new Date() + new Date(result.start) / 86400000 * 60;
        return `⏲ You are working on: *${commandData}*. Time logged so far: ${duration.toFixed(2)} hours.`;
    }
}