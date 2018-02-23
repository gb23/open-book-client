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
            <div className="pa3">
                <p className="f6 f5-ns lh-copy measure mv0">{props.section.text}</p>
             
                <a onClick={ () => props.onVote(props.section.id)} className="link dim" href="#0"><i className="fa fa-thumbs-up"  />{props.section.votes}</a>
                
                <span style={{color: 'blue', marginLeft: '150px'}}>{props.location ? `${props.location}/${props.total}` : ""}</span>
              
            </div>
            
        </div> 
    );
}

export default SectionCard;