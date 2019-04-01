let initialState = {
    show:false
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)

    switch(action.type) {
        case 'PRELOADER_SHOW':
            updated['show'] = true;
            return updated
        case 'PRELOADER_HIDE':
            updated['show'] = false;
            return updated

      default:
            return state
    }
}