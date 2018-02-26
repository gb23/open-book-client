import React from 'react';

const CompositionLabel = (props) => {
    let current = props.comp.ids.indexOf(props.comp.currentId) + 1
    let length = props.comp.ids.length;
    let returnStatement = ""
    if(props.urlId !== "new" && props.urlId !== ":id" && props.sectionId !== 0){
        returnStatement = 
        ( 
            <div className="compositionLabel">
                Composition {current} of {length}
            </div>
        )
    }

    return returnStatement;
}

export default CompositionLabel;