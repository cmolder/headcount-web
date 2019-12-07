export const SET_CLASSROOM = 'SET_CLASSROOM';
export const CLEAR_CLASSROOM = 'CLEAR_CLASSROOM';

export const SET_SESSION = 'SET_SESSION';
export const CLEAR_SESSION = 'CLEAR_SESSION';

export function setClassroom(payload) {
    return {
        type: SET_CLASSROOM,
        payload: payload
    }
}

export function clearClassroom() {
    return {
        type: CLEAR_CLASSROOM,
    }
}

export function setSession(payload) {
    return {
        type: SET_SESSION,
        payload: payload
    }
}

export function clearSession() {
    return {
        type: CLEAR_SESSION
    }
}