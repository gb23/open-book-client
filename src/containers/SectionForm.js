import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSectionFormData } from '../actions/sectionForm'
import { createSection, setCurrentSection } from '../actions/sections'
import { setComposition } from '../actions/composition';
import { push } from 'react-router-redux';

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
        //

        const nextId = parseInt(this.getGreatestSectionsId() + 1, 10);
        const nextSection = {id: nextId, ...sectionFormData}
        this.props.setCurrentSection({...nextSection, valid: false});
        if(nextSection.prev_id === -1){
            this.props.setComposition({ids: [...this.props.composition.ids, nextSection.id] , currentId: nextSection.id});
            this.props.push(`/compositions/${this.props.composition.ids.length + 1}`)
        }
    }

    handleButtonColor = (name) => {
        
        let classString = "f6 link dim br1 ph3 pv2 mb2 dib white ";
        if (name === "ADD CONTENT"){
            classString += "bg-navy"
        }
        else if (name === "ADD VERSION"){
            
            classString += "bg-dark-red"
        }
        else {
            // ADD COMPOSITION
            classString += "bg-yellow"
        }
        return classString;


    }

    getGreatestSectionsId = () => parseInt(this.props.sections.list.slice(-1)[0].id, 10)

    render(){
        const { text } = this.props.sectionFormData

        return(
            <div tabIndex="0" className="center SectionCard bt bb b--black-10" 
            onKeyDown={this.props.onDown ? (event) => this.props.onDown(event, this.props.section) : () => ""}
            onClick={this.props.onSelect ? (event) => this.props.onSelect(event, this.props.section) : () => ""}
            ref={ this.props.divRef }
            >
             <h5 className="sans-serif">{this.props.name}</h5>
                <form onSubmit={this.handleOnSubmit}>
                    <label htmlFor="text">Text:</label>
                    
                    <textarea className="" onChange={this.handleOnChange} 
                                onClick={(event) => event.stopPropagation()} 
                                type="text" name="text" value={text} 
                    />
                    <div>
                        <button className={this.handleButtonColor(this.props.name)} type="submit" >{`${this.props.name}`}</button>
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
        sectionFormData: state.sectionFormData,
        composition: state.composition
    }
}
export default connect(mapStateToProps, { setCurrentSection, updateSectionFormData, createSection, setComposition, push })(SectionForm);
