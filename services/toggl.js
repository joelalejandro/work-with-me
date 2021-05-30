import fetch from 'node-fetch';
import { asJSON } from '../utils/fetch';

const API_URL = "https://api.track.toggl.com/api/v8";
const tokens = {};

const saveToken = (chatId, token) => {
    tokens[chatId] = token;
};

const getToken = (chatId) => tokens[chatId];

const getAuthHeader = (token) => {
    const auth = Buffer.from(`${token}:api_token`).toString('base64');
    console.log('Encoding ', token, ' as ', auth);
    return { authorization: `Basic ${auth}` };
}

const login = async (token) => {
    try {
        const profile = await fetch(`${API_URL}/me`, {
            headers: {
                ...getAuthHeader(token),
                'content-type': 'application/json'
            }
        }).then(asJSON);
        return {
            name: profile.data.fullname,
        };
    } catch (e) {
        return {
            error: e.message
        };
    }
};

const startTimeEntry = async (description, token) => {
    try {
        const result = await fetch(`${API_URL}/time_entries/start`, {
            headers: {
                ...getAuthHeader(token),
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                time_entry: {
                    description,
                    created_with: 'work-with-me-bot'
                }
            })
        })
        return result;
    } catch (e) {
        return {
            error: e.message
        };
    }
}

const getCurrentTimeEntry = async (token) => {
    try {
        const timeEntry = await fetch(`${API_URL}/time_entries/current`, {
            headers: {
                ...getAuthHeader(token),
                'content-type': 'application/json'
            }
        });
        return timeEntry.data;
    } catch (e) {
        return {
            error: e.message,
        }
    }
}

const stopTimeEntry = async (token) => {
    try {
        const { id } = await getCurrentTimeEntry(token);
        const result = await fetch(`${API_URL}/time_entries/${id}/stop`, {
            headers: {
                ...getAuthHeader(token),
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
        return result;
    } catch (e) {
        return {
            error: e.message
        };
    }
}

export { login, saveToken, getToken, startTimeEntry, stopTimeEntry, getCurrentTimeEntry };