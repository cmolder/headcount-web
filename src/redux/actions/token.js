export const SET_TOKEN = 'SET_TOKEN';

export function setToken(payload) {
    return {
        type: SET_TOKEN,
        payload: payload
    }
}