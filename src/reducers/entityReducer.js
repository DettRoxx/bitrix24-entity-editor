let initialState = {
    entities:[],
	entity_add_form_data:{
        name:'',
        entity: '',
        access: [],
		validation: {
            name:'',
            entity: ''
		},
		visible: false
    },
	entity_update_form_data:{
        name:'',
        entity: '',
        entity_new: '',
        access: [],
		validation: {
            name:'',
            entity_new: ''
		},
		visible: false
	}
}

export default (state = initialState, action) => {

    let updated = Object.assign({}, state)

    switch(action.type) {
        case 'ENTITY_FETCHING_SUCCESS':
            updated['entities'] = action.payload
            return updated;
			
        case 'ENTITY_ADD_START':
            return updated    

        case 'ENTITY_ADD_SUCCESS':
            return updated  

        case 'ENTITY_ADD_ERROR':
            return updated 


        case 'ENTITY_DELETE_START':
            return updated    

        case 'ENTITY_DELETE_SUCCESS':
            return updated  

        case 'ENTITY_DELETE_ERROR':
            return updated             


        case 'ENTITY_ADD_FORM_OPEN':
            return {
                ...state,
                entity_add_form_data: {
                    ...state.entity_add_form_data,
                    visible: true
                }
            }
		
        case 'ENTITY_ADD_FORM_CHANGE':
            updated['entity_add_form_data'] = action.payload
            return updated;

        case 'ENTITY_ADD_FORM_CLOSE':
            return {
                ...state,
                entity_add_form_data: {
                    ...state.entity_add_form_data,
                    visible: false
                }
            }

        case 'ENTITY_UPDATE_FORM_OPEN':
            return {
                ...state,
                entity_update_form_data: {
                    ...state.entity_update_form_data,
                    ...action.payload,
                    visible: true
                }
            }
		
        case 'ENTITY_UPDATE_FORM_CHANGE':
            updated['entity_update_form_data'] = action.payload
            return updated;

        case 'ENTITY_UPDATE_FORM_CLOSE':
            return {
                ...state,
                entity_update_form_data: {
                    ...state.entity_update_form_data,
                    visible: false
                }
            }            
        default:
            return state
    }
}