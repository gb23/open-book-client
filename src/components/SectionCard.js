import React from 'react';

const SectionCard = (props) => (
    <div key={props.section.id} className="SectionCard">
        <h3>{props.section.text}</h3>
        <p>Votes: {props.section.votes}</p>
    </div> 
)

export default SectionCard;