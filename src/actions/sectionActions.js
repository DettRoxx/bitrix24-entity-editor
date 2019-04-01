import {sectionGet, sectionAdd, sectionDelete, sectionUpdate} from '../b24api/Section';

/**
 * Section Fetching
 */
function sectionFetchingStart(payload){
    return {
        type: 'SECTION_FETCHING_START',
        payload
    }
}

function sectionFetchingSuccess(payload){
    return {
        type: 'SECTION_FETCHING_SUCCESS',
        payload
    }
}

function sectionFetchingError(payload){
    return {
        type: 'SECTION_FETCHING_ERROR',
        payload
    }
}

export function getSection(payload){
    return dispatch => {
        dispatch(sectionFetchingStart(payload));

        return sectionGet(payload)
            .then( (response) => {
                dispatch(sectionFetchingSuccess(response));
            })
            .catch((error) => {
                dispatch(sectionFetchingError(error));
            })
    }
}

/**
 * Section All Fetching
 */
function sectionAllFetchingStart(payload){
    return {
        type: 'SECTION_ALL_FETCHING_START',
        payload
    }
}

function sectionAllFetchingSuccess(payload){
    return {
        type: 'SECTION_ALL_FETCHING_SUCCESS',
        payload
    }
}

function sectionAllFetchingError(payload){
    return {
        type: 'SECTION_ALL_FETCHING_ERROR',
        payload
    }
}

export function getSectionAll(payload){
    return dispatch => {
        dispatch(sectionAllFetchingStart(payload));

        return sectionGet(payload)
            .then( (response) => {
                dispatch(sectionAllFetchingSuccess(response));
            })
            .catch((error) => {
                dispatch(sectionAllFetchingError(error));
            })
    }
}

/**
 * Section Add
 */
function sectionAddStart(payload){
    return {
        type: 'SECTION_ADD_START',
        payload
    }
}

function sectionAddSuccess(payload){
    return {
        type: 'SECTION_ADD_SUCCESS',
        payload
    }
}

function sectionAddError(payload){
    return {
        type: 'SECTION_ADD_ERROR',
        payload
    }
}

export function addSection(payload){
    return dispatch => {
        dispatch(sectionAddStart(payload));

        return sectionAdd(payload)
            .then((response) => {
                dispatch(sectionAddSuccess(response));
				dispatch(getSection({ENTITY:payload.ENTITY, FILTER:{SECTION_ID:payload.SECTION}}));
            })
            .catch((error) => {
                dispatch(sectionAddError(error));
            })
    } 
}


/**
 * Section Delete
 */
function sectionDeleteStart(payload){
    return {
        type: 'SECTION_DELETE_START',
        payload
    }
}

function sectionDeleteSuccess(payload){
    return {
        type: 'SECTION_DELETE_SUCCESS',
        payload
    }
}

function sectionDeleteError(payload){
    return {
        type: 'SECTION_DELETE_ERROR',
        payload
    }
}

export function deleteSection(payload){
    return dispatch => {
        dispatch(sectionDeleteStart(payload));

        return sectionDelete({ENTITY:payload.ENTITY, ID:payload.ID})
            .then((response) => {
                dispatch(sectionDeleteSuccess(response));
				dispatch(getSection({ENTITY:payload.ENTITY, FILTER:{SECTION_ID:payload.SECTION}}));
            })
            .catch((error) => {
                dispatch(sectionDeleteError(error));
            })
    } 
}

/**
 * Section Update
 */
function sectionUpdateStart(payload){
    return {
        type: 'SECTION_UPDATE_START',
        payload
    }
}

function sectionUpdateSuccess(payload){
    return {
        type: 'SECTION_UPDATE_SUCCESS',
        payload
    }
}

function sectionUpdateError(payload){
    return {
        type: 'SECTION_UPDATE_ERROR',
        payload
    }
}

export function updateSection(payload){
    return dispatch => {
        dispatch(sectionUpdateStart(payload));

        return sectionUpdate(payload)
            .then((response) => {
                dispatch(sectionUpdateSuccess(response));
				dispatch(getSection({ENTITY:payload.ENTITY, FILTER:{SECTION_ID:payload.SECTION}}));
            })
            .catch((error) => {
                dispatch(sectionUpdateError(error));
            })
    } 
}

export function sectionAddFormOpen(payload){
    return {
        type: 'SECTION_ADD_FORM_OPEN',
        payload
    }
}

export function sectionAddFormChange(payload){
    return {
        type: 'SECTION_ADD_FORM_CHANGE',
        payload
    }
}

export function sectionAddFormClose(){
    return {
        type: 'SECTION_ADD_FORM_CLOSE'
    }
}

/**
* TODO: remove destructor from actions to component
*/
export function sectionUpdateFormOpen(payload){
    let { ID: id, ENTITY: entity, NAME: name, DESCRIPTION: description, SECTION: section} = payload;

    return {
        type: 'SECTION_UPDATE_FORM_OPEN',
        payload: {id, entity, name, description, section}
    }
}

export function sectionUpdateFormChange(payload){
    return {
        type: 'SECTION_UPDATE_FORM_CHANGE',
        payload
    }
}

export function sectionUpdateFormClose(){
    return {
        type: 'SECTION_UPDATE_FORM_CLOSE'
    }
}





