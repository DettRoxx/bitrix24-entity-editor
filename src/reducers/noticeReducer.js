
let initialState = {
    text:null,
    title:null,
    type:null
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)

    switch(action.type) {
        case 'NOTICE_ADD':
            updated['text'] = action.payload.text;
            updated['title'] = action.payload.title;
            updated['type'] = action.payload.type;
            return updated
        case 'NOTICE_CLEAR':
            updated['text'] = '';
            updated['title'] = '';
            updated['type'] = '';
            return updated

      default:
            return state
    }
}