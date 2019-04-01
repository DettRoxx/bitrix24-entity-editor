import { noticeAdd } from '../actions/noticeActions';

const noticeMiddleware = ({ dispatch}) => next => action => {
  next(action);

  switch(action.type){
    case 'ENTITY_DELETE_ERROR':
    case 'ENTITY_UPDATE_ERROR':
    case 'ENTITY_ADD_ERROR':
    case 'SECTION_DELETE_ERROR':
    case 'SECTION_UPDATE_ERROR':
    case 'SECTION_ADD_ERROR':
    case 'ITEM_DELETE_ERROR':
    case 'ITEM_UPDATE_ERROR':
    case 'ITEM_ADD_ERROR':
    case 'ITEM_PROPERTY_DELETE_ERROR':
    case 'ITEM_PROPERTY_UPDATE_ERROR':
    case 'ITEM_PROPERTY_ADD_ERROR':
      dispatch(noticeAdd({
        title: `${action.payload.status} ${action.payload.answer.error}`,
        text: action.payload.answer.error_description,
        type: 'error'
      }));
      break;   
    case 'ENTITY_DELETE_SUCCESS':
    case 'ENTITY_UPDATE_SUCCESS':
    case 'ENTITY_ADD_SUCCESS':
    case 'SECTION_DELETE_SUCCESS':
    case 'SECTION_UPDATE_SUCCESS':
    case 'SECTION_ADD_SUCCESS':
    case 'ITEM_DELETE_SUCCESS':
    case 'ITEM_UPDATE_SUCCESS':
    case 'ITEM_ADD_SUCCESS':
    case 'ITEM_PROPERTY_DELETE_SUCCESS':
    case 'ITEM_PROPERTY_UPDATE_SUCCESS':
    case 'ITEM_PROPERTY_ADD_SUCCESS':
        dispatch(noticeAdd({
          title: `${action.payload.status}`,
          text: 'OK',
          type: 'success'
        }));
      break;
    case 'ENTITY_FETCHING_ERROR':
    case 'ITEM_PROPERTY_FETCHING_ERROR':  
    case 'ITEM_FETCHING_ERROR': 
    case 'SECTION_FETCHING_ERROR':  
      dispatch(noticeAdd({
        title: `${action.payload.status} ${action.payload.ex.error}`,
        text: action.payload.ex.error_description,
        type: 'error'
      }));
      break;
    default:
    break;
  }
}

export default noticeMiddleware;