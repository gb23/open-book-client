export default ( state = {loading: true, list:[]}, action ) => {
  switch(action.type) {
    case 'GET_SECTIONS_SUCCESS':
        return action.sections;

    case 'CREATE_SECTION_SUCCESS':
        //returning  action.sections.section, action.sections.sectionPrev
        const indexPrev = state.findIndex(sectionObj => sectionObj.id === action.sections.sectionPrev.id);
     
        return [
            ...state.slice(0, indexPrev), 
            {...action.sections.sectionPrev}, 
            {...action.sections.section},
            ...state.slice(indexPrev + 1)
        ].sort((A, B) => A.id - B.id);

    case 'SECTION_UPVOTE':
        const index = state.findIndex(sectionObj => sectionObj.id === action.sectionId);
        const section = state[index];
        return [
            ...state.slice(0, index), {...section, votes: section.votes + 1},
            ...state.slice(index + 1)
        ];
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