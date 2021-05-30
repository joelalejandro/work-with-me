import fetch from 'node-fetch';
import { asJSON } from '../utils/fetch';

const API_URL = "https://api.track.toggl.com/api/v8";

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

export { login };