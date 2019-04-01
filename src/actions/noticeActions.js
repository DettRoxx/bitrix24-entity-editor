import actionTypes from '../constants/actionTypes';

export function noticeAdd(payload){
    return {
        type: actionTypes.NOTICE_ADD,
        payload
    }
}

export function noticeClear(){
    return {
        type: actionTypes.NOTICE_CLEAR,
    }
}


