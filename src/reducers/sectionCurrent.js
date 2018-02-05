const initialState = {id: 0, text: ""}; //??initial section may not always have an id of zero (assigned in backend)


export default ( state = initialState , action) => {
    switch(action.type){
        case 'SECTION_RIGHT':
            return {...action.section}
        case 'SECTION_LEFT':
            return {...action.section}
        case 'SECTION_SET':
            return {...action.section}
        default:
            return state;
    }
}