import { resetSectionForm } from './sectionForm';

const API_URL = process.env.REACT_APP_API_URL;

// ** Action Creators **
const setSections = sections => {
     return {
        type: 'GET_SECTIONS_SUCCESS',
        sections 
     };
}
const addSection = sections => {
    return {
        type: 'CREATE_SECTION_SUCCESS',
        sections
    };
}
const sectionUpVote = (sectionId) => {
    return {
        type: 'SECTION_UPVOTE',
        sectionId
    };
}
export const setCurrentSection = (section) => {
    //debugger;
    return {
        type: 'SECTION_SET',
        section
    }
}
export const replaceSectionWithForm = (replacementInfo) => {
    return {
        type: 'SECTION_REPLACE',
        replacementInfo
    }
}
export const replaceFormWithSection = (replacementInfo) => {
    return {
        type: 'SECTION_RERENDER',
        replacementInfo
    }
}

// ** Async Actions **
export const upVoteSection = (section) => {
    return dispatch => {
        return fetch(`${API_URL}/sections/${section.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({section: {...section, votes: section.votes + 1}})
        })
        .then(response => response.json())
        .then(section => {
            dispatch(sectionUpVote(section.id))
        })
        .catch(error => console.log(error));
    }
}
export const getSections = () => {
    return dispatch => {
        return fetch(`${API_URL}/sections`)
            .then(response => response.json())
            .then(sections => dispatch(setSections(sections)))
            .catch(error => console.log(error));
    }
}

export const createSection = (section) => {
    return dispatch => {
        return fetch(`${API_URL}/sections`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({section: section})
        })
            .then(response => response.json())
            .then(sections => {
                dispatch(addSection(sections))
                dispatch(resetSectionForm())
            })
            .catch(error => console.log(error));
    }
}