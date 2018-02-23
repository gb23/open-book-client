import React from 'react';

const SectionCard = (props) => {
    return (
        <div  
            key={props.section.id} className="center SectionCard bt bb b--black-10" 
            // mw5 mw6-ns br3 hidden ba b--black-10
            tabIndex="0" onKeyDown={(event) => props.onDown(event, props.section)}
            onClick={ (event) => props.onSelect(event, props.section) }
            ref={ props.divRef }
        > 
         
            {/* <h1 className="SectionTop f6 br3  br--top bg-near-black white mv0 pv2 ph3">{props.section.id}</h1> */}
            <div className="pl2 pr2 pb1 SectionCardText">
                <p className="f6 f5-ns ">{props.section.text}</p>
                {/* lh-copy measure mv0 */}
            </div>
            <div className="cardData mt2">
                <a onClick={ () => props.onVote(props.section.id)} className="ml2 link dim" href="#0"><i className="fa fa-thumbs-up blue"  />
                    {props.section.votes}
                </a>
                
                <span className="mr2 blue">{props.location ? `${props.location}/${props.total}` : ""}</span>
            </div>
            
            
        </div> 
    );
}

export default SectionCard;