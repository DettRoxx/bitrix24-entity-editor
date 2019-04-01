let initialState = {
    items:[],
    section:false,
    entity:false,
	item_add_form_data:{
        name:'',
        entity: '',
        section:'',
        preview_text:'',
        detail_text:'',
        preview_picture:'',
        detail_picture:'',
		validation: {
            name:'',
            entity: ''
        },
        properties:{},
		visible: false
    },
	item_update_form_data:{
        id: '',
        name:'',
        entity: '',
        section:'',
        preview_text:'',
        detail_text:'',
        preview_picture:'',
        detail_picture:'',
        properties:{},
		validation: {
            name:''
		},
		visible: false
    },
    item_properties_dictonary:{}
}

export default (state = initialState, action) => {

    let updated = Object.assign({}, state)

    switch(action.type) {
        case 'ITEM_FETCHING_START':
            updated['section'] = action.payload.FILTER.SECTION_ID || false;
                
            updated['entity'] = action.payload.ENTITY;
            return updated;

        case 'ITEM_FETCHING_SUCCESS':
            updated['items'] = action.payload
            return updated;
			
        case 'ITEM_ADD_START':
            return updated    

        case 'ITEM_ADD_SUCCESS':
            return updated  

        case 'ITEM_ADD_ERROR':
            return updated 

        case 'ITEM_PROPERTIES_FETCHING_SUCCESS':
            updated['item_properties_dictonary'] = action.payload
            return updated

        case 'ITEM_PROPERTIES_FETCHING_START':
            return updated

        case 'ITEM_DELETE_START':
            return updated    

        case 'ITEM_DELETE_SUCCESS':
            return updated  

        case 'ITEM_DELETE_ERROR':
            return updated             

        case 'ITEM_ADD_FORM_OPEN':
            return {
                ...state,
                item_add_form_data: {
                    ...initialState.item_add_form_data,
                    properties: {},
                    validation: {
                        ...initialState.item_add_form_data.validation
                    },
                    entity: action.payload.entity,
                    section: action.payload.section ? action.payload.section : '',
                    visible: true
                }
            }
		
        case 'ITEM_ADD_FORM_CHANGE':
            updated['item_add_form_data'] = action.payload
            return updated;

        case 'ITEM_ADD_FORM_CLOSE':
            return {
                ...state,
                item_add_form_data: {
                    ...initialState.item_add_form_data,
                    properties: {},
                    validation: {
                        ...initialState.item_add_form_data.validation
                    }
                }
            }

        case 'ITEM_UPDATE_FORM_OPEN':
            return {
                ...state,
                item_update_form_data: {
                    ...state.item_update_form_data,
                    ...action.payload,
                    section: action.payload.section ? action.payload.section : '',
                    visible: true
                }
            }
		
        case 'ITEM_UPDATE_FORM_CHANGE':
            updated['item_update_form_data'] = action.payload
            return updated;

        case 'ITEM_UPDATE_FORM_CLOSE':
            return {
                ...state,
                item_update_form_data: {
                    ...initialState.item_update_form_data,
                }
            }            
        default:
            return state
    }
}