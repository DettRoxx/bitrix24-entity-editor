import { getSectionAll } from '../actions/sectionActions';
import { preloaderHide, preloaderShow } from '../actions/preloaderActions';

const generalMiddleware = ({ dispatch, getState }) => next => action => {
  next(action);
  switch(action.type){
    case 'SECTION_ADD_SUCCESS':
    case 'SECTION_DELETE_SUCCESS':
    case 'SECTION_UPDATE_SUCCESS':
      dispatch(getSectionAll({ENTITY:action.payload.query.data.ENTITY, FILTER:{}}))
    break;
    default:
    break;
  }

  const state = getState();

  let excludedLoaderActions = [
    'SECTION_ALL_FETCHING_START',
    'SECTION_ALL_FETCHING_SUCCESS',
    'SECTION_ALL_FETCHING_ERROR'
  ]

  if(/(.*)_(FETCHING_START|UPDATE_START|DELETE_START)/.test(action.type) && !state.preloader.show && !excludedLoaderActions.includes(action.type))
    dispatch(preloaderShow());

  if(/(.*)_(FETCHING_ERROR|FETCHING_SUCCESS|UPDATE_SUCCESS|UPDATE_ERROR|DELETE_SUCCESS|DELETE_ERROR)/.test(action.type) && !excludedLoaderActions.includes(action.type)){
    dispatch(preloaderHide());
 
    //let entityEditor = document.getElementById('entity_editor');
    //window.BX24.fitWindwo(false, entityEditor.clientHeight+700);
    window.BX24.fitWindow();
  }
}

export default generalMiddleware;