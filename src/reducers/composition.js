const initialState = {ids: [-1], currentId: -1}; 


export default ( state = initialState , action) => {
    switch(action.type){
       
        case 'COMPOSITION_SET':
            return {...action.composition}
        default:
            return state;
    }
}