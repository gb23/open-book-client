const initialState = {id: null, valid: false}; 


export default ( state = initialState , action) => {
    switch(action.type){
       // case 'SECTION_RIGHT':
         //   return {...action.section}
        //case 'SECTION_LEFT':
         //   return {...action.section}
        case 'SECTION_SET':
            return {...action.section}
        default:
            return state;
    }
}