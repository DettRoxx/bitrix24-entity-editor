let initialState = {
    sections:[],
    sections_all:[],
    section: false,
    entity: false,
	section_add_form_data:{
        name:'',
        entity: '',
        description:'',
        code:'',
        section: '',
		validation: {
            name:'',
            entity: '',
            code:''
		},
		visible: false
    },
	section_update_form_data:{
        id: '',
        name:'',
        entity: '',
        description:'',
        code:'',
        section: '',
		validation: {
            name:'',
            code:''
		},
		visible: false
	}
}

export default (state = initialState, action) => {

    let updated = Object.assign({}, state)

    switch(action.type) {
        case 'SECTION_FETCHING_START':
            updated['section'] = action.payload.FILTER.SECTION_ID || false;
            updated['entity'] = action.payload.ENTITY;

            return updated;

        case 'SECTION_FETCHING_SUCCESS':
            updated['sections'] = action.payload || [];
            
            return updated;

        case 'SECTION_ALL_FETCHING_START':
            updated['entity'] = action.payload.ENTITY;    
            
            return updated;

        case 'SECTION_ALL_FETCHING_SUCCESS':
            updated['sections_all'] = action.payload || [];
            
            return updated;
			
        case 'SECTION_ADD_START':
            return updated    

        case 'SECTION_ADD_SUCCESS':
            return updated  

        case 'SECTION_ADD_ERROR':
            return updated 


        case 'SECTION_DELETE_START':
            return updated    

        case 'SECTION_DELETE_SUCCESS':
            return updated  

        case 'SECTION_DELETE_ERROR':
            return updated             

        case 'SECTION_ADD_FORM_OPEN':
            return {
                ...state,
                section_add_form_data: {
                    ...state.section_add_form_data,
                    entity: action.payload.entity,
                    section: action.payload.section ? action.payload.section : '',
                    visible: true
                }
            }
		
        case 'SECTION_ADD_FORM_CHANGE':
            updated['section_add_form_data'] = action.payload
            return updated;

        case 'SECTION_ADD_FORM_CLOSE':
            return {
                ...state,
                section_add_form_data: {
                    ...state.section_add_form_data,
                    visible: false
                }
            }

        case 'SECTION_UPDATE_FORM_OPEN':
            return {
                ...state,
                section_update_form_data: {
                    ...state.section_update_form_data,
                    ...action.payload,
                    section: action.payload.section ? action.payload.section : '',
                    visible: true
                }
            }
		
        case 'SECTION_UPDATE_FORM_CHANGE':
            updated['section_update_form_data'] = action.payload
            return updated;

        case 'SECTION_UPDATE_FORM_CLOSE':
            return {
                ...state,
                section_update_form_data: {
                    ...state.section_update_form_data,
                    visible: false
                }
            }            
        default:
            return state
    }
}