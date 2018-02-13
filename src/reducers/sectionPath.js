const initialState = []

export default ( state = initialState , action) => {
    
    switch(action.type){
        case 'SECTION_GET_PATH':
            return [...action.path]
        default:
            return state;
    }
}