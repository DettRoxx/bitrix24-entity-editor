import {itemGet, itemAdd, itemDelete, itemUpdate} from '../b24api/Item';
import {itemPropertyGet} from '../b24api/ItemProperty';

/**
 * Item Fetching
 */
function itemFetchingStart(payload){
    return {
        type: 'ITEM_FETCHING_START',
        payload
    }
}

function itemFetchingSuccess(payload){
    return {
        type: 'ITEM_FETCHING_SUCCESS',
        payload
    }
}

function itemFetchingError(payload){
    return {
        type: 'ITEM_FETCHING_ERROR',
        payload
    }
}


function itemPropertiesFetchingStart(){
    return {
        type: 'ITEM_PROPERTIES_FETCHING_START'
    }
}

function itemPropertiesFetchingSuccess(payload){
    return {
        type: 'ITEM_PROPERTIES_FETCHING_SUCCESS',
        payload
    }
}

export function getItem(payload){
    return dispatch => {
        dispatch(itemFetchingStart(payload));

        return itemGet(payload)
            .then( (response) => {
                dispatch(itemFetchingSuccess(response));
                dispatch(itemPropertiesFetchingStart());
                return itemPropertyGet({ENTITY: payload.ENTITY})
            })
            .then( (response) => {
                dispatch(itemPropertiesFetchingSuccess(response));
            })
            .catch((error) => {
                dispatch(itemFetchingError(error));
            })
    }
}

/**
 * Item Add
 */
function itemAddStart(payload){
    return {
        type: 'ITEM_ADD_START',
        payload
    }
}

function itemAddSuccess(payload){
    return {
        type: 'ITEM_ADD_SUCCESS',
        payload
    }
}

function itemAddError(payload){
    return {
        type: 'ITEM_ADD_ERROR',
        payload
    }
}

export function addItem(payload){
    return dispatch => {
        dispatch(itemAddStart(payload));

        return itemAdd(payload)
            .then((response) => {
                dispatch(itemAddSuccess(response));
				dispatch(getItem({ENTITY: payload.ENTITY, FILTER:{SECTION_ID:payload.SECTION}}));
            })
            .catch((error) => {
                dispatch(itemAddError(error));
            })
    } 
}


/**
 * Item Delete
 */
function itemDeleteStart(payload){
    return {
        type: 'ITEM_DELETE_START',
        payload
    }
}

function itemDeleteSuccess(payload){
    return {
        type: 'ITEM_DELETE_SUCCESS',
        payload
    }
}

function itemDeleteError(payload){
    return {
        type: 'ITEM_DELETE_ERROR',
        payload
    }
}

export function deleteItem(payload){
    return dispatch => {
        dispatch(itemDeleteStart(payload));

        return itemDelete({ENTITY:payload.ENTITY, ID:payload.ID})
            .then((response) => {
                dispatch(itemDeleteSuccess(response));
				dispatch(getItem({ENTITY:payload.ENTITY, FILTER:{SECTION_ID:payload.SECTION}}));
            })
            .catch((error) => {
                dispatch(itemDeleteError(error));
            })
    } 
}

/**
 * Item Update
 */
function itemUpdateStart(payload){
    return {
        type: 'ITEM_UPDATE_START',
        payload
    }
}

function itemUpdateSuccess(payload){
    return {
        type: 'ITEM_UPDATE_SUCCESS',
        payload
    }
}

function itemUpdateError(payload){
    return {
        type: 'ITEM_UPDATE_ERROR',
        payload
    }
}

export function updateItem(payload){
    return dispatch => {
        dispatch(itemUpdateStart(payload));

        return itemUpdate(payload)
            .then((response) => {
                dispatch(itemUpdateSuccess(response));
				dispatch(getItem({ENTITY:payload.ENTITY, FILTER:{SECTION_ID:payload.SECTION}}));
            })
            .catch((error) => {
                dispatch(itemUpdateError(error));
            })
    } 
}

export function itemAddFormOpen(payload){
    return {
        type: 'ITEM_ADD_FORM_OPEN',
        payload
    }
}

export function itemAddFormChange(payload){
    return {
        type: 'ITEM_ADD_FORM_CHANGE',
        payload
    }
}

export function itemAddFormClose(){
    return {
        type: 'ITEM_ADD_FORM_CLOSE'
    }
}

export function itemUpdateFormOpen(payload){
    return {
        type: 'ITEM_UPDATE_FORM_OPEN',
        payload
    }
}

export function itemUpdateFormChange(payload){
    return {
        type: 'ITEM_UPDATE_FORM_CHANGE',
        payload
    }
}

export function itemUpdateFormClose(){
    return {
        type: 'ITEM_UPDATE_FORM_CLOSE'
    }
}
