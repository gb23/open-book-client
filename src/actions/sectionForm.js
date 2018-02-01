// **Action Creators **
export const updateSectionFormData = sectionFormData => {
    return {
        type: 'UPDATED_DATA',
        sectionFormData
    };
}

export const resetSectionForm = () => {
    return {
        type: 'RESET_SECTION_FORM'
    }
}