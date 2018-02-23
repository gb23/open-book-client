import React from 'react';

const CompositionLabel = (props) => {
    let returnStatement = ""
    if(props.urlId !== "new" && props.urlId !== ":id"){
        returnStatement = 
        ( 
            <div className="compositionLabel">
                Composition {props.urlId} of {props.totalNumberComp}
            </div>
        )
    }
    return returnStatement;
}

export default CompositionLabel;