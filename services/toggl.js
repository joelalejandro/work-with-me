import fetch from 'node-fetch';
import { asJSON } from '../utils/fetch';

const API_URL = "https://api.track.toggl.com/api/v8/";

const getAuthHeader = (token) => {
    const auth = new Buffer(`${token}:api_token`).toString('base64');
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
            name: profile.fullname,
        };
    } catch {
        return {
            error: 'login_failed'
        };
    }
};

export { login };