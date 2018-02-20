export default ( state = {loading: true, list: null}, action ) => {
  switch(action.type) {
     
    case 'GET_SECTIONS_SUCCESS':
    //debugger;
        return {list: [...action.sections], loading: true}

    case 'CREATE_SECTION_SUCCESS':
        let returnVal = null;
        if (action.sections.sectionPrev){
            const indexPrev = state.list.findIndex(sectionObj => sectionObj.id === action.sections.sectionPrev.id);
            returnVal = {list: [
                ...state.list.slice(0, indexPrev), 
                {...action.sections.sectionPrev}, 
                {...action.sections.section},
                ...state.list.slice(indexPrev + 1)
            ].sort((A, B) => A.id - B.id), loading: false};
        }
        else {
            returnVal = {list: [...state.list, {...action.sections.section}].sort((A, B) => A.id - B.id), loading: false};
        }
        return returnVal;

    case 'SECTION_UPVOTE':
        const index = state.list.findIndex(sectionObj => sectionObj.id === action.sectionId);
        const section = state.list[index];
        return {list: [
            ...state.list.slice(0, index), {...section, votes: section.votes + 1},
            ...state.list.slice(index + 1)
        ], loading: false};
    case 'LOADING':
        return {list: [...state.list], loading: true};
    case 'NOT_LOADING':
        return {list: [...state.list], loading: false};
    default:
        return state;
  }
}



// export default function sectionsReducer(state= {loading: false, sections: []}, action) {
//     switch ( action.type ) {
//       case 'LOADING_SECTIONS':
//         return Object.assign({}, state, {loading: true})
//       case 'FETCH_SECTIONS':
//         return {loading: false, sections: action.payload}
      
//       default:
//         return state;
//     }
  
//   }