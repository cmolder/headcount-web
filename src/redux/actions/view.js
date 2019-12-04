export const SET_VIEW = 'SET_VIEW';

export const LOGIN   = 'login';
export const PROFILE = 'profile';
export const ACTIVE  = 'active';

export function setView(payload) {
    
    return {
        type: SET_VIEW,
        payload: payload
    }
}