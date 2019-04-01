import {entityGet, entityAdd, entityDelete, entityUpdate} from '../b24api/Entity';

/**
 * Entity Fetching
 */
function entityFetchingStart(){
    return {
        type: 'ENTITY_FETCHING_START'
    }
}

function entityFetchingSuccess(payload){
    return {
        type: 'ENTITY_FETCHING_SUCCESS',
        payload
    }
}

function entityFetchingError(payload){
    return {
        type: 'ENTITY_FETCHING_ERROR',
        payload
    }
}

export function getEntity(entity){
    return dispatch => {
        dispatch(entityFetchingStart());

        return entityGet(entity)
            .then( (response) => {
                dispatch(entityFetchingSuccess(response));
            })
            .catch((error) => {
                dispatch(entityFetchingError(error));
            })
    }
}

/**
 * Entity Add
 */
function entityAddStart(){
    return {
        type: 'ENTITY_ADD_START'
    }
}

function entityAddSuccess(payload){
    return {
        type: 'ENTITY_ADD_SUCCESS',
        payload
    }
}

function entityAddError(payload){
    return {
        type: 'ENTITY_ADD_ERROR',
        payload
    }
}

export function addEntity(data){
    return dispatch => {
        dispatch(entityAddStart());

        return entityAdd(data.entity, data.name)
            .then((response) => {
                dispatch(entityAddSuccess(response));
				dispatch(getEntity());
            })
            .catch((error) => {
                dispatch(entityAddError(error));
            })
    } 
}

/**
 * Entity Delete
 */
function entityDeleteStart(){
    return {
        type: 'ENTITY_DELETE_START'
    }
}

function entityDeleteSuccess(payload){
    return {
        type: 'ENTITY_DELETE_SUCCESS',
        payload
    }
}

function entityDeleteError(payload){
    return {
        type: 'ENTITY_DELETE_ERROR',
        payload
    }
}

export function deleteEntity(entity){
    return dispatch => {
        dispatch(entityDeleteStart());

        return entityDelete(entity)
            .then((response) => {
                dispatch(entityDeleteSuccess(response));
				dispatch(getEntity());
            })
            .catch((error) => {
                dispatch(entityDeleteError(error));
            })
    } 
}

/**
 * Entity Update
 */
function entityUpdateStart(){
    return {
        type: 'ENTITY_UPDATE_START'
    }
}

function entityUpdateSuccess(payload){
    return {
        type: 'ENTITY_UPDATE_SUCCESS',
        payload
    }
}

function entityUpdateError(payload){
    return {
        type: 'ENTITY_UPDATE_ERROR',
        payload
    }
}

export function updateEntity(entity){
    return dispatch => {
        dispatch(entityUpdateStart());

        return entityUpdate(entity)
            .then((response) => {
                dispatch(entityUpdateSuccess(response));
				dispatch(getEntity());
            })
            .catch((error) => {
                dispatch(entityUpdateError(error));
            })
    } 
}

export function entityAddFormOpen(){
    return {
        type: 'ENTITY_ADD_FORM_OPEN'
    }
}

export function entityAddFormChange(payload){
    return {
        type: 'ENTITY_ADD_FORM_CHANGE',
        payload
    }
}

export function entityAddFormClose(){
    return {
        type: 'ENTITY_ADD_FORM_CLOSE'
    }
}

export function entityUpdateFormOpen(payload){
    let { ENTITY: entity, NAME: name, ENTITY: entity_new} = payload;

    return {
        type: 'ENTITY_UPDATE_FORM_OPEN',
        payload: {entity, name, entity_new}
    }
}

export function entityUpdateFormChange(payload){
    return {
        type: 'ENTITY_UPDATE_FORM_CHANGE',
        payload
    }
}

export function entityUpdateFormClose(){
    return {
        type: 'ENTITY_UPDATE_FORM_CLOSE'
    }
}





