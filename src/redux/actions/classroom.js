export const SET_CLASSROOM = 'SET_CLASSROOM';
export const CLEAR_CLASSROOM = 'CLEAR_CLASSROOM';

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