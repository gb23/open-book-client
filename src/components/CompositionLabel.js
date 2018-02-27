import React from 'react';

const CompositionLabel = (props) => {
    let current = props.comp.ids.indexOf(props.comp.currentId) + 1
    let length = props.comp.ids.length;
    let returnStatement = ""
    if(props.urlId !== ":id" && props.urlId !== "new" ){
        if(props.section.id !== 0 || (props.section.id === 0 && props.section.prev_id !== -1 && props.section.prev_id !== -2)){
            returnStatement = 
            ( 
                <div className="compositionLabel">
                    Composition {current} of {length}
                </div>
            )
        }
        else {
            returnStatement = 
            ( 
                <div className="compositionLabel">
                    Create Composition {length + 1}
                </div>
            )
        }  
    }
    else if (props.urlId === "new"){
            returnStatement = 
            ( 
                <div className="compositionLabel">
                    Create Composition {length + 1}
                </div>
            )
    }

    return returnStatement;
}

export default CompositionLabel;