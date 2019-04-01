import {itemPropertyGet, itemPropertyAdd, itemPropertyDelete, itemPropertyUpdate} from '../b24api/ItemProperty';

/**
 * Item Fetching
 */
function itemPropertyFetchingStart(){
    return {
        type: 'ITEM_PROPERTY_FETCHING_START'
    }
}

function itemPropertyFetchingSuccess(payload){
    return {
        type: 'ITEM_PROPERTY_FETCHING_SUCCESS',
        payload
    }
}

function itemPropertyFetchingError(payload){
    return {
        type: 'ITEM_PROPERTY_FETCHING_ERROR',
        payload
    }
}

export function getItemProperty(payload){
    return dispatch => {
        dispatch(itemPropertyFetchingStart());

        return itemPropertyGet(payload)
            .then( (response) => {
                dispatch(itemPropertyFetchingSuccess(response));
            })
            .catch((error) => {
                dispatch(itemPropertyFetchingError(error));
            })
    }
}

/**
 * Item Add
 */
function itemPropertyAddStart(payload){
    return {
        type: 'ITEM_PROPERTY_ADD_START',
        payload
    }
}

function itemPropertyAddSuccess(payload){
    return {
        type: 'ITEM_PROPERTY_ADD_SUCCESS',
        payload
    }
}

function itemPropertyAddError(payload){
    return {
        type: 'ITEM_PROPERTY_ADD_ERROR',
        payload
    }
}

export function addItemProperty(payload){
    return dispatch => {
        dispatch(itemPropertyAddStart(payload));

        return itemPropertyAdd(payload)
            .then((response) => {
                dispatch(itemPropertyAddSuccess(response));
				dispatch(getItemProperty({ENTITY: payload.ENTITY}));
            })
            .catch((error) => {
                dispatch(itemPropertyAddError(error));
            })
    } 
}


/**
 * Item Delete
 */
function itemPropertyDeleteStart(){
    return {
        type: 'ITEM_PROPERTY_DELETE_START'
    }
}

function itemPropertyDeleteSuccess(payload){
    return {
        type: 'ITEM_PROPERTY_DELETE_SUCCESS',
        payload
    }
}

function itemPropertyDeleteError(payload){
    return {
        type: 'ITEM_PROPERTY_DELETE_ERROR',
        payload
    }
}

export function deleteItemProperty(payload){
    return dispatch => {
        dispatch(itemPropertyDeleteStart());

        return itemPropertyDelete(payload)
            .then((response) => {
                dispatch(itemPropertyDeleteSuccess(response));
				dispatch(getItemProperty({ENTITY: payload.ENTITY}));
            })
            .catch((error) => {
                dispatch(itemPropertyDeleteError(error));
            })
    } 
}

/**
 * Item Update
 */
function itemPropertyUpdateStart(payload){
    return {
        type: 'ITEM_PROPERTY_UPDATE_START',
        payload
    }
}

function itemPropertyUpdateSuccess(payload){
    return {
        type: 'ITEM_PROPERTY_UPDATE_SUCCESS',
        payload
    }
}

function itemPropertyUpdateError(payload){
    return {
        type: 'ITEM_PROPERTY_UPDATE_ERROR',
        payload
    }
}

export function updateItemProperty(payload){
    return dispatch => {
        dispatch(itemPropertyUpdateStart(payload));

        return itemPropertyUpdate(payload)
            .then((response) => {
                dispatch(itemPropertyUpdateSuccess(response));
				dispatch(getItemProperty({entity:payload.ENTITY}));
            })
            .catch((error) => {
                dispatch(itemPropertyUpdateError(error));
            })
    } 
}

export function itemPropertyAddFormOpen(payload){
    return {
        type: 'ITEM_PROPERTY_ADD_FORM_OPEN',
        payload
    }
}

export function itemPropertyAddFormChange(payload){
    return {
        type: 'ITEM_PROPERTY_ADD_FORM_CHANGE',
        payload
    }
}

export function itemPropertyAddFormClose(){
    return {
        type: 'ITEM_PROPERTY_ADD_FORM_CLOSE'
    }
}

export function itemPropertyUpdateFormOpen(payload){
    let { NAME: name, ENTITY: entity, PROPERTY: property, PROPERTY:property_new, TYPE: type} = payload;

    return {
        type: 'ITEM_PROPERTY_UPDATE_FORM_OPEN',
        payload: {name, entity, property, property_new, type}
    }
}

export function itemPropertyUpdateFormChange(payload){
    return {
        type: 'ITEM_PROPERTY_UPDATE_FORM_CHANGE',
        payload
    }
}

export function itemPropertyUpdateFormClose(){
    return {
        type: 'ITEM_PROPERTY_UPDATE_FORM_CLOSE'
    }
}





