const initialState = {valid: false, sectionToReplace: {}}


export default ( state = initialState , action) => {
    
    switch(action.type){
        case 'SECTION_REPLACE':
            return action.replacementInfo
        case 'SECTION_RERENDER':
            return action.replacementInfo
        default:
            return state;
    }
}