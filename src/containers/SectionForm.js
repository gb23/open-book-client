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
        //debugger;
        event.preventDefault();  
        if (this.props.sectionFormData.text.trim().length !== 0){
            //debugger;
            const sectionFormData = {...this.props.sectionFormData, prev_id: parseInt(this.props.sectionToAddTo, 10) }
            if(this.props.url && this.props.url.params.id === "about"){
                this.props.createSection({...sectionFormData, about: true})
            }
            else {
                this.props.createSection(sectionFormData)
            }
           
 
            const nextId = parseInt(this.getGreatestSectionsId() + 1, 10);
            const nextSection = {id: nextId, ...sectionFormData}
            this.props.setCurrentSection({...nextSection, valid: false});
            if(nextSection.prev_id === -1 || nextSection.prev_id === -2 ){
                this.props.setComposition({ids: [...this.props.composition.ids, nextSection.id] , currentId: nextSection.id});
                if(this.props.url && this.props.url.params.id === "about"){
                    //debugger;
                    //this.props.push(`/compositions/about`);  
                }
                else{
                    this.props.push(`/compositions/${this.props.composition.ids.length + 1}`)
                }

                
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
            this.formElement.firstChild.focus();
            
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
        let placeHolder = "";
        if(this.props.name === "ADD COMPOSITION"){
            placeHolder = "Give your new composition a title or other descriptive attribute."
        }
        return(
            <div className="center SectionCard bt bb b--black-10" 
           // onKeyDown={this.props.onDown ? (event) => this.props.onDown(event, this.props.section) : () => ""}
           //onClick={this.props.onSelect ? (event) => this.props.onSelect(event, this.props.section) : () => ""}
           
            ref={ this.props.divRef}
            >
             {/* <h5 className="sans-serif">{this.props.name}</h5> */}
                <form  ref={el => this.formElement = el} className="formPaddingTop pl2 pr2 pb1" 
                // onFocus={() => {
                //     debugger;
                //    // this.formElement.textarea.focus();
                // }} 
                onSubmit={this.handleOnSubmit}
                >
                    
                    
                    <textarea tabIndex="0" className="w-100 fixTextArea avenir bg-near-white" onChange={this.handleOnChange} 
                                
                                placeholder={placeHolder}
                                 onFocus={(event)=>{
                                //     const props = this.props
                                //     //debugger;
                                //     console.log()
                                //     //console.log("bottom: ", this.formElement.getBoundingClientRect().bottom)
                                //     console.log("viewport height", window.innerHeight)

                                //     //prevent only partial textbox with hidden button from showing on focus(&click)
                                //     console.log("innerHeight ", window.innerHeight);
                                //     console.log("bottom: ", this.formElement.getBoundingClientRect().bottom)
                                    if (window.innerHeight < this.formElement.getBoundingClientRect().bottom){
                                       this.formElement.scrollIntoView(false); //false means put it on the bottom of the viewport
                                    }
                                    
                                }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                     this.props.onSelect(event, this.props.section)

                                

                                     
                                }}
                                onKeyDown={(event) => {
                                    //const props = this.props;
                                    if (event.key === "ArrowRight" ||event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown" ){
                                        if (this.props.sectionFormData.text === ""){
                                            //debugger;
                                            console.log("no text")
                                            this.props.onDown(event, this.props.section)
                                        }
                                        else {
                                            let position = this.formElement.firstChild.selectionStart;
                                            console.log(this.formElement.firstChild.selectionStart, "selectionStart")
                                            console.log(this.formElement.firstChild.selectionEnd, "selectionEnd")
                                            if (position === this.props.sectionFormData.text.length && (event.key === "ArrowRight" || event.key === "ArrowDown")){
                                                console.log("trying to go right or down")
                                                this.props.onDown(event, this.props.section)
                                                //this.props.onSelect(event, this.props.section)
                                            }
                                            else if (position === 0 && (event.key === "ArrowUp" || event.key === "ArrowLeft")){
                                                console.log("trying to go left or up")
                                                this.props.onDown(event, this.props.section)
                                                //this.props.onSelect(event, this.props.section)
                                            }
                                            
                                        }
                                    }
                                }} 
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
