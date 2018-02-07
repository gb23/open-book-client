import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSectionFormData } from '../actions/sectionForm'
import { createSection } from '../actions/sections'

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
        const props = this.props;  
        const sectionFormData = {...this.props.sectionFormData, prev_id: props.sectionToAddTo }
       
        this.props.createSection(sectionFormData);
    }
    render(){
        const { text } = this.props.sectionFormData
        return(
            <div className="center mw5 mw6-ns br3 hidden ba b--black-10 SectionCard">
             <h1 className="SectionTop f6 br3  br--top bg-near-black white mv0 pv2 ph3">Add a new section</h1>
                <form onSubmit={this.handleOnSubmit}>
                    {/* <input type="hidden" name="prev_id" value={}/> */}
                    <label htmlFor="text">Text:</label>
                    
                    <textarea onChange={this.handleOnChange} type="text" name="text" value={text} />
                    <div>
                        <button type="submit">Create Section</button>
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
export default connect(mapStateToProps, {updateSectionFormData, createSection})(SectionForm);