import { resetSectionForm } from './sectionForm';


const API_URL = process.env.REACT_APP_API_URL;

// ** Action Creators **
const setSections = sections => {
     return {
        type: 'GET_SECTIONS_SUCCESS',
        sections 
     };
}
const addSection = section => {
    return {
        type: 'CREATE_SECTION_SUCCESS',
        section
    };
}

// ** Async Actions **
export const getSections = () => {
    return dispatch => {
        return fetch(`${API_URL}/sections`)
            .then(response => response.json())
            .then(sections => dispatch(setSections(sections)))
            .catch(error => console.log(error));
    }
}
export const createSection = section => {
    return dispatch => {
        return fetch(`${API_URL}/sections`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({section: section})
        })
            .then(response => response.json())
            .then(section => {
                dispatch(addSection(section))
                dispatch(resetSectionForm())
            })
            .catch(error => console.log(error));
    }
}

// export function fetchSections(){
//     return function(dispatch){
//         dispatch({type: 'LOADING_SECTIONS'})
//         return fetch(`${API_URL}/sections`)
//           .then(res => {
//             return res.json()
//           }).then(responseJson => {
//             dispatch({type: 'FETCH_SECTIONS', payload: responseJson.sections})
//         })
//       }
// }

