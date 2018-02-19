import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSectionFormData } from '../actions/sectionForm'
import { createSection, setCurrentSection } from '../actions/sections'

// doesn't have to be a class.  is a stateless
class SectionForm extends Component {
    handleOnChange = event => {
        const { name, value } = event.target;
        const currentSectionFormData = Object.assign({}, this.props.sectionFormData, {
            [name]: value
        })
        this.props.updateSectionFormData(currentSectionFormData)
    }
    
    handleOnSubmit = (event) => {
        event.preventDefault();  

        const sectionFormData = {...this.props.sectionFormData, prev_id: parseInt(this.props.sectionToAddTo, 10) }
        this.props.createSection(sectionFormData)

        const nextId = parseInt(this.getGreatestSectionsId() + 1, 10);
        const nextSection = {id: nextId, ...sectionFormData}
  
        this.props.setCurrentSection({...nextSection, valid: false});
    }

    getGreatestSectionsId = () => parseInt(this.props.sections.list.slice(-1)[0].id, 10)

    render(){
        const { text } = this.props.sectionFormData

        return(
            <div tabIndex="0" className="center mw5 mw6-ns br3 hidden ba b--black-10 SectionCard" 
            onKeyDown={this.props.onDown ? (event) => this.props.onDown(event, this.props.section) : () => ""}
            onClick={this.props.onSelect ? (event) => this.props.onSelect(event, this.props.section) : () => ""}
            ref={ this.props.divRef }
            >
             <h1 className="SectionTop f6 br3  br--top bg-near-black white mv0 pv2 ph3">{this.props.name}</h1>
                <form onSubmit={this.handleOnSubmit}>
                    <label htmlFor="text">Text:</label>
                    
                    <textarea onChange={this.handleOnChange} 
                                onClick={(event) => event.stopPropagation()} 
                                type="text" name="text" value={text} 
                    />
                    <div>
                        <button type="submit" >Create Section</button>
                    </div>
                </form>
            </div>
        ); 
    }
}

const mapStateToProps = state => {
    return {
        sections: state.sections,
        sectionCurrent: state.sectionCurrent,
        sectionFormData: state.sectionFormData
    }
}
export default connect(mapStateToProps, { setCurrentSection, updateSectionFormData,  createSection })(SectionForm);
//replaceFormWithSection,