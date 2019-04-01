let initialState = {
    items:[],
	item_property_add_form_data:{
        name:'',
        entity: '',
        type: '',
        property: '',
		validation: {
            name:'',
            type: '',
            property:''
		},
		visible: false
    },
	item_property_update_form_data:{
        name:'',
        entity: '',
        type: '',
        property: '',
        prproperty_new: '',
		validation: {
            name:'',
            type:'',
            property: '',
            property_new:''
		},
		visible: false
	}
}

export default (state = initialState, action) => {

    let updated = Object.assign({}, state)

    switch(action.type) {
        case 'ITEM_PROPERTY_FETCHING_SUCCESS':
            updated['items'] = action.payload
            return updated;
			
        case 'ITEM_PROPERTY_ADD_START':
            return updated    

        case 'ITEM_PROPERTY_ADD_SUCCESS':
            return updated  

        case 'ITEM_PROPERTY_ADD_ERROR':
            return updated 


        case 'ITEM_PROPERTY_DELETE_START':
            return updated    

        case 'ITEM_PROPERTY_DELETE_SUCCESS':
            return updated  

        case 'ITEM_PROPERTY_DELETE_ERROR':
            return updated             

        case 'ITEM_PROPERTY_ADD_FORM_OPEN':
            return {
                ...state,
                item_property_add_form_data: {
                    ...state.item_property_add_form_data,
                    visible: true,
                    entity: action.payload
                }
            }
		
        case 'ITEM_PROPERTY_ADD_FORM_CHANGE':
            updated['item_property_add_form_data'] = action.payload
            return updated;

        case 'ITEM_PROPERTY_ADD_FORM_CLOSE':
            return {
                ...state,
                item_property_add_form_data: {
                    ...state.item_property_add_form_data,
                    visible: false
                }
            }

        case 'ITEM_PROPERTY_UPDATE_FORM_OPEN':
            return {
                ...state,
                item_property_update_form_data: {
                    ...state.item_property_update_form_data,
                    ...action.payload,
                    visible: true
                }
            }
		
        case 'ITEM_PROPERTY_UPDATE_FORM_CHANGE':
            updated['item_property_update_form_data'] = action.payload
            return updated;

        case 'ITEM_PROPERTY_UPDATE_FORM_CLOSE':
            return {
                ...state,
                item_property_update_form_data: {
                    ...state.item_property_update_form_data,
                    visible: false
                }
            }            
        default:
            return state
    }
}