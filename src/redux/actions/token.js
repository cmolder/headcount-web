export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';

export function setToken(payload) {
    return {
        type: SET_TOKEN,
        payload: payload
    }
}

export function clearToken() {
    return {
        type: CLEAR_TOKEN
    }
}