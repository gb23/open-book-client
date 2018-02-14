import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSectionFormData } from '../actions/sectionForm'
import { createSection, setCurrentSection } from '../actions/sections'
//replaceFormWithSection

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
       
        
        const sectionFormData = {...this.props.sectionFormData, prev_id: this.props.sectionToAddTo }
      //  debugger
        this.props.createSection(sectionFormData);
        
        //const props = this.props;  
       //debugger
       //make section current this soon-to-be-created newly id
       //since the object hasn't been created yet, we will create a mock object based on the id value it will receive
       //so we need to find the greatest id value in this.props.sections and add 1 to it
        const nextId = parseInt(this.getGreatestSectionsId() + 1, 10);
        const nextSection = {id: nextId, ...sectionFormData}
        //this.props.sections.find(section => section.id === nextId)
        //debugger;
        this.props.setCurrentSection({...nextSection, valid: false});
        //debugger;
       //make redux store sectionReplace.valid = false
        //this.props.replaceFormWithSection({valid: false});
        
    }

    getGreatestSectionsId = () => parseInt(this.props.sections.slice(-1)[0].id, 10)

    render(){
        const { text } = this.props.sectionFormData
       // debugger;
        return(
            <div tabIndex="0" className="center mw5 mw6-ns br3 hidden ba b--black-10 SectionCard" 
            onKeyDown={this.props.onDown ? (event) => this.props.onDown(event, this.props.section) : () => ""}
            onClick={this.props.onSelect ? (event) => this.props.onSelect(event, this.props.section) : () => ""}
            ref={ this.props.divRef }
            >
             <h1 className="SectionTop f6 br3  br--top bg-near-black white mv0 pv2 ph3">Add a new section</h1>
                <form onSubmit={this.handleOnSubmit}>
                    {/* <input type="hidden" name="prev_id" value={}/> */}
                    <label htmlFor="text">Text:</label>
                    
                    <textarea onChange={this.handleOnChange} 
                                onClick={(event) => event.stopPropagation()} 
                                type="text" name="text" value={text} 
                    />
                    <div>
                        <button  type="button">Create Section</button>
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