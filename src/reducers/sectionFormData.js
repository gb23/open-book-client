const initialState = {text: "", votes: 0, next_ids: [-1]}


export default ( state = initialState , action) => {
    switch(action.type){
        case 'UPDATED_DATA':
            return action.sectionFormData
        case 'RESET_SECTION_FORM':
            return initialState;
        default:
            return state;
    }
}