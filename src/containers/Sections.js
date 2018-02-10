import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Sections.css'
import SectionCard from '../components/SectionCard'
import { getSections, upVoteSection, replaceSectionWithForm, setCurrentSection } from '../actions/sections';
import SectionForm from './SectionForm'
// Array.prototype.cutNegOnes = function() {
//     console.log(this);
//     if(this[0] === -1 && this[this.length -1] === -1 && this.length > 2){
//         console.log("inside!!")
//         return this.slice(1,-1);
//     }
//     else if(this[0] === -1 && this[this.length -1] === -1 && this.length === 2){
//         return this.slice(1)
//     }
//     else {
//         console.error("cutNegOnes fail...")
//     }
// } 
let debug = false;
class Sections extends Component{
    
    componentDidMount() {
        this.props.getSections(); 
    }
    handleUpVote = (sectionId) => {
        const sectionAddVote = this.props.sections.filter(section => section.id === sectionId);
        this.props.upVoteSection(...sectionAddVote);
        //todo:
        //set store's currentId to this sectionId
    }
    handleKeyDown = (event, section) => {
        // if sectionId === store's section, you are good
        console.log("section had a keyDown:", section.id)
        console.log(event.key);
        //debugger;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft"){
            event.preventDefault();
            this.handleArrow(event.key, section)
        }
    }
    nextIdBoundary = (keyName, parentSection) => {
        let boundary = {};
        if (keyName === "ArrowRight" ){
            boundary.index = parentSection.next_ids.length - 1
            boundary.direction = "right"
        } else if (keyName === "ArrowLeft"){
            boundary.index = 0;
            boundary.direction = "left"
        }
        return boundary
    }
    getNextId = (parentSection, sectionIdIndexInNextID, direction) => {
        let nextId;
        if(direction === "right"){
            nextId = parentSection.next_ids[sectionIdIndexInNextID + 1]
        } else if (direction === "left") {
            nextId = parentSection.next_ids[sectionIdIndexInNextID - 1]
        }
        return nextId;
    }
    handleArrow = (keyName, section) => {
        if(section.id === 0){
            //debugger;
            //this means we are arrowing while on a compose card
            const parentSection = this.props.sections.find(sec => sec.id === this.props.sectionReplace.sectionToReplace.prev_id)
            if(keyName === "ArrowLeft"){
                 // if left arrow, go to the parent' last next_id
                 const nextSection = this.props.sections.find(section => section.id === parentSection.next_ids[parentSection.next_ids.length - 1]);
                 this.props.setCurrentSection(nextSection)
            } else if (keyName === "ArrowRight"){
                // if right arrow, go to the parents first next_id
                const nextSection = this.props.sections.find(section => section.id === parentSection.next_ids[0]);
                this.props.setCurrentSection(nextSection)
            }
           

            
            this.props.sectionReplace.valid = false;
            //debugger;


        } else if(section.prev_id >= 0){
           
                console.log("not the top!");
                //if inside here, the card that was selected when '-->' pressed has a parent node
                //get parent node:
               
          
                const parentSection = this.props.sections.find(sec => sec.id === section.prev_id);

                const sectionIdIndexInNextID = parentSection.next_ids.indexOf(section.id)
                    //check if current section id is not last item in parent node's next_ids (for right arrow) OR is not first item (for left arrow).
                const boundary = this.nextIdBoundary(keyName, parentSection);
                    if(sectionIdIndexInNextID !== boundary.index){
                        console.log("you move", boundary.direction)
                        // find the next section (the one that will be arrowed over to)
                        const nextId = this.getNextId(parentSection, sectionIdIndexInNextID, boundary.direction)
                    
                        
                        const nextSection = this.props.sections.find(section => section.id === nextId);//this.getNextId(parentSection, sectionIdIndexInNextID, boundary.direction));//nextId);
                    
                        
                        if(nextSection){
                            
                            this.props.setCurrentSection(nextSection);
                        } else {
                            console.log("if this code never gets hit, you should delete it")
                            debugger;
                            //set redux state replaceSection = {valid: true, sectionToReplace: sectionCurrent};
                            // trigger re-render
                            this.props.setCurrentSection({id: 0})
                            this.props.replaceSectionWithForm({valid: true, sectionToReplace: this.props.sectionCurrent});
                        }
                        
                    } else { //elseif boundary.index
                        //console.log("you can move,  boundary.direction")
                        
//debug = true;
                        this.props.replaceSectionWithForm({valid: true, sectionToReplace: this.props.sectionCurrent});
                        // else is last item in parent node's next_ids and cannot move right/left anymore.add UI animation so user knows can't arrow right/left.
                        console.log("you 'move'", boundary.direction);
                    }
               
                
            } else {
                if(keyName === "ArrowRight"){
                    //you cannot arrow right because you are on the parent of all nodes.  add UI animation so user knows can't arrow right.
                    console.log("you are at the top and cannot therefore move right");
                    
                } else if (keyName === "ArrowLeft"){
                    console.log("you are at the top and cannot therefore move left");
                }
                
            }
    }
    handleSelect = (event, section) => {
        this.props.setCurrentSection(section);
    }
    ancestorOfPointer = (sectId, pointer) => {
        let done = false;
        let found = false;
        let checkId = pointer;
        const locateSection = (checkId) => {
            return this.props.sections.find(section => section.id === checkId)
        }
        while (!done && sectId !== -1){
            const checkSection = locateSection(checkId);
            if (checkSection){
                if (checkSection.prev_id === sectId){
                    found = true;
                    done = true;
                } else {
                    checkId = checkSection.prev_id;
                }
            } else {
                done = true;
            }
        }
        return found;
    }
    sectionCards = () => {       
if (debug) {debugger;}
        let nextId = this.props.sections[0].id;
        let pointer = this.props.sections[0].id;
        
        if (!this.props.sections[0]){
           // nextId = this.props.sections[0].id;
            console.error("something not right!")
        }
        
        let idHighestVotes = -1

        if (this.props.sectionCurrent && this.props.sectionCurrent.id !== -1){
            if(this.props.sectionReplace.valid === true){
                //when we want to show an x-form, make sure that the parent of the x-form is the pointer so it and its ancestors will be shown.
                pointer = this.props.sectionReplace.sectionToReplace.prev_id;
            } else {
               pointer = this.props.sectionCurrent.id;
            }
        }

         const sectionCards =   this.props.sections.map(section =>{
                // 1st time: this will be equal
                //debugger;
                if (section.id === nextId){
                    //section will be displayed based on these hierarchical rules.  Section is:
                    // 0. replaced by a form
                    // 1. pointed to (user has selected)
                    // 2. an ancestor of a pointed to section
                    // 3. has the most votes compared to those sections with the same section parent
                    
                    
                    const props = this.props
                   //0.
                    if(props.sectionReplace.valid && section.id === pointer){
                        //if we are at the parent of the node to be replaced with an x-form
                        //make the nextId be the sectionToReplace
                        nextId = props.sectionReplace.sectionToReplace.id;
                        return <SectionCard  key={section.id} section={section} onVote={this.handleUpVote} onDown={this.handleKeyDown} onSelect={this.handleSelect} />; 
                    }else if (props.sectionReplace.valid && section.id === props.sectionReplace.sectionToReplace.id){
                        //this.props.replaceSectionWithForm({valid: false});
                        nextId = -1;
                        return < SectionForm key="-1" section={{id: 0}} onDown={this.handleKeyDown} onSelect={this.handleSelect} sectionToAddTo={props.sectionReplace.sectionToReplace.prev_id} />
                    }
                    //1:
                    else {
                        //debugger;
                        if(section.next_ids.find(sectId => sectId === pointer)){
                            nextId = pointer;
                        } else if (section.next_ids.find(sectId => this.ancestorOfPointer(sectId, pointer))){//pointer has ancestor that is in section.next_ids) { //2:
                            nextId = section.next_ids.find(sectId => this.ancestorOfPointer(sectId, pointer));
                        } else { //3:
                            idHighestVotes = section.next_ids[0] //default is first in array
                            section.next_ids.forEach(nextid => {

                                const segmentNext = this.props.sections.find(sect => sect.id === nextid)

                                const segmentOfHighestVotes = this.props.sections.find(sect => sect.id === idHighestVotes)

<<<<<<< HEAD
                            if(segmentNext && segmentOfHighestVotes && segmentNext.votes > segmentOfHighestVotes.votes){
                                idHighestVotes = nextid;
                            }
                        })
                        nextId = idHighestVotes;
                    }

                    return <SectionCard selected={section.id === this.props.sectionCurrent.id || undefined } key={section.id} section={section} onVote={this.handleUpVote} onDown={this.handleKeyDown} onSelect={this.handleSelect} />;               
                }
                else {
=======
                                if(segmentNext && segmentOfHighestVotes && segmentNext.votes > segmentOfHighestVotes.votes){
                                    idHighestVotes = nextid;
                                }
                            })
                            nextId = idHighestVotes;
                        }
                        return <SectionCard  key={section.id} section={section} onVote={this.handleUpVote} onDown={this.handleKeyDown} onSelect={this.handleSelect} />;               
                    } 
                } else {
>>>>>>> add-new-section-x-axis-branch
                    return "";
                }
            }).filter(text => text !== "");
            
            let sectionToAddTo = -1;
        
            //adds to the last rendered card when replaceSection = false.
            //add this: 
            //if replaceSection.valid = false
            if (sectionCards.slice(-1)[0]){
                sectionToAddTo = sectionCards.slice(-1)[0].key
            }       
             
            return {sectionCards, sectionToAddTo} ;
    }
  
    render() {
        return(
            <div >
                <h1> Sections Component</h1>
                {this.props.loading ? "loading!!" : this.sectionCards().sectionCards} 

                {/* only want the bottom seciton form rendering if replace section form is not rendered */}
                {/*  &&!this.props.replaceSection */}
                {!this.props.loading && !this.props.sectionReplace.valid ? < SectionForm onDown={null} onSelect={null} sectionToAddTo={this.sectionCards().sectionToAddTo} /> : "" }
            </div>
        );
    }  
}

const mapStateToProps = (state) => {
    
    return ({
        loading: state.sections.loading,
        sections: state.sections,
        sectionCurrent: state.sectionCurrent,
        sectionReplace: state.sectionReplace
    });
}

export default connect(mapStateToProps, { getSections, upVoteSection, replaceSectionWithForm, setCurrentSection })(Sections);



