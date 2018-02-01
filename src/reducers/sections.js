export default ( state = [], action ) => {
  switch(action.type) {
    case 'GET_SECTIONS_SUCCESS':
        return action.sections;

    case 'CREATE_SECTION_SUCCESS':
        return state.concat(action.section)
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