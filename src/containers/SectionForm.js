import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSectionFormData } from '../actions/sectionForm'
import { createSection, setCurrentSection } from '../actions/sections'
import { resetSectionForm } from '../actions/sectionForm'
import { setComposition } from '../actions/composition';
import { push } from 'react-router-redux';

class SectionForm extends Component {
    // constructor(props){
    //     super(props)
    //     this.warning = false;
    // }
  
    handleOnChange = event => {
        const { name, value } = event.target;
        const currentSectionFormData = Object.assign({}, this.props.sectionFormData, {
            [name]: value
        })
        this.props.updateSectionFormData(currentSectionFormData)
    }
    
    handleOnSubmit = (event) => {
        event.preventDefault();  
        if (this.props.sectionFormData.text.trim().length !== 0){
            const sectionFormData = {...this.props.sectionFormData, prev_id: parseInt(this.props.sectionToAddTo, 10) }
            this.props.createSection(sectionFormData)
 
            const nextId = parseInt(this.getGreatestSectionsId() + 1, 10);
            const nextSection = {id: nextId, ...sectionFormData}
            this.props.setCurrentSection({...nextSection, valid: false});
            if(nextSection.prev_id === -1){
                this.props.setComposition({ids: [...this.props.composition.ids, nextSection.id] , currentId: nextSection.id});
                this.props.push(`/compositions/${this.props.composition.ids.length + 1}`)
            }
        }
        else {
            
            const textAreaClassOriginal = this.formElement.firstElementChild.className;
            const textAreaClassNew = textAreaClassOriginal + " warningRed"
            this.formElement.firstElementChild.className = textAreaClassNew;
            setTimeout(() => {
                this.formElement.firstElementChild.className = textAreaClassOriginal;
            }, 100);

            this.props.resetSectionForm();
            
            
        }
        
    }

    handleButtonColor = (name) => {
        
        let classString = "fade f6 link br1 ph3 mb2 dib white ";
        if (name === "ADD CONTENT"){
            classString += "bg-navy"
        }
        else if (name === "ADD VERSION"){
            
            classString += "bg-dark-red"
        }
        else {
            // ADD COMPOSITION
            classString += "bg-gold"
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
             {/* <h5 className="sans-serif">{this.props.name}</h5> */}
                <form ref={el => this.formElement = el}className="formPaddingTop pl2 pr2 pb1" onSubmit={this.handleOnSubmit}>
                    
                    
                    <textarea className="w-100 fixTextArea avenir bg-near-white" onChange={this.handleOnChange} 
                                onClick={(event) => event.stopPropagation()} 
                                type="text" name="text" value={text} 
                    />
                    <div className="cardData reverseFlexDirection">
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
export default connect(mapStateToProps, { setCurrentSection, updateSectionFormData, createSection, setComposition, push, resetSectionForm })(SectionForm);
