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
    
    handleOnSubmit = event => {
        event.preventDefault();
        this.props.createSection(this.props.sectionFormData)
    }
    render(){
        const { text, votes, next_ids } = this.props.sectionFormData
        return(
            <div className="SectionCard">
                Add a new section
                <form onSubmit={this.handleOnSubmit}>
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
        sectionFormData: state.sectionFormData
    }
}
export default connect(mapStateToProps, {updateSectionFormData, createSection})(SectionForm);