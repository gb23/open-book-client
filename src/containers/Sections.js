import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Sections.css'
import SectionCard from '../components/SectionCard'
import { getSections, upVoteSection, replaceSectionWithForm, setCurrentSection, setPath } from '../actions/sections';
import SectionForm from './SectionForm'

class Sections extends Component{
    constructor(props){
        super(props)
        this.sectionList = []
        this.formRef = false
    }

    componentDidMount() {
        this.props.getSections().then(() => this.props.setCurrentSection(this.props.sections[0]))
    }

    componentDidUpdate() {
        // if(this.formRef){
        //     this.bottomForm.focus();
            
        // }
        // else 
        if(this.divElement){
            this.divElement.focus();
        }
        //debugger;
        this.formRef = false;
        this.sectionList = [];
        this.sectionCards().sectionCards.forEach(section => {
            this.sectionList = [...this.sectionList, parseInt(section.key, 10)];
        });
    }
    handleUpVote = (sectionId) => {
        const sectionAddVote = this.props.sections.filter(section => section.id === sectionId);
        this.props.upVoteSection(...sectionAddVote);
    }
    handleKeyDown = (event, section) => {
        // if sectionId === store's section, you are good
        console.log("section had a keyDown:", section.id)
        console.log(event.key);
        //debugger;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "ArrowUp"){
            event.preventDefault();
            //debugger;
           // this.props.setPath(path); 
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
        if (keyName === "ArrowDown" || keyName === "ArrowUp"){
            //debugger;
            //find sectionCurrent index in sectionList
            const lastIndex = this.sectionList.length - 1;
            const currentIndex = this.sectionList.indexOf(this.props.sectionCurrent.id)
            let nextId = null;
            //if first, only enable down arrow
            if (currentIndex === 0 && this.sectionList.length > 1){
                if(keyName === "ArrowDown"){
                    nextId = this.sectionList[currentIndex + 1];
                }  
            }
            //else you're on an x-form.  can arrow up only
            else if (currentIndex === lastIndex && this.props.sectionCurrent.id === 0 && this.sectionList.length > 1){
                //debugger;
                if (keyName === "ArrowUp"){
                    nextId = this.sectionList[lastIndex - 1]
                    this.props.replaceSectionWithForm({valid: false})
                }
                
            }
            //else if you're on last and last isn't 0, there's the y-form to go to
            else if(currentIndex === lastIndex && this.props.sectionCurrent.id !== 0 && keyName === "ArrowDown" && this.sectionList.length > 1){
                    nextId = -1;
            }
            //else if you are on a y-form and you arrow up, go to last index of sectionList
            else if(this.props.sectionCurrent.id === -1 && this.sectionList.length > 1){
                if(keyName === "ArrowUp"){
                    nextId = this.sectionList[lastIndex]
                }
            }
            else if(keyName === "ArrowUp" && this.sectionList.length > 1){
                nextId = this.sectionList[currentIndex - 1];
            }
            else if(keyName === "ArrowDown" && this.sectionList.length > 1){
                nextId = this.sectionList[currentIndex + 1];
            }
            if(nextId){
                if (nextId < 1){
                    const prevID = this.props.sections.find(section => section.id === this.sectionList[lastIndex]).id;
                    this.props.setCurrentSection({id: -1, prev_id: prevID, next_ids:[-1]});
                } else {
                    const nextSection = this.props.sections.find(section => section.id === nextId);
                    this.props.setCurrentSection(nextSection);
                }
            }
            
            

        } else if (keyName === "ArrowLeft" || keyName === "ArrowRight"){

            if(section.id === 0){
                //debugger;
                //this means we are arrowing while on a compose card
                const parentSection = this.props.sections.find(sec => sec.id === parseInt(this.props.sectionReplace.sectionToReplace.prev_id, 10))
                if(keyName === "ArrowLeft"){
                    // if left arrow, go to the parent' last next_id
                    if (parentSection === undefined ){debugger;};
                    const nextSection = this.props.sections.find(section => section.id === parentSection.next_ids[parentSection.next_ids.length - 1]);
                    this.props.setCurrentSection(nextSection)
                    
                } else if (keyName === "ArrowRight"){
                    // if right arrow, go to the parents first next_id
                    const nextSection = this.props.sections.find(section => section.id === parentSection.next_ids[0]);
                    this.props.setCurrentSection(nextSection)
                }
            

                //debugger;
                this.props.replaceSectionWithForm({valid: false})
                console.log("sectionReplace is false")
                //debugger;


            } else if(section.prev_id >= 0){
            
                console.log("not the top!");
                //if inside here, the card that was selected when '-->' pressed has a parent node
                //get parent node:
            
                //debugger;
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
                        this.props.replaceSectionWithForm({valid: true, sectionToReplace: this.props.sectionCurrent});
                        this.props.setCurrentSection({id: 0})
                        // else is last item in parent node's next_ids and cannot move right/left anymore.add UI animation so user knows can't arrow right/left.
                        console.log("you 'move'", boundary.direction);
                    }  
            } else {
                if(keyName === "ArrowRight"){
                    //you cannot arrow right because you are on the parent of all nodes.  add UI animation so user knows can't arrow right.
                    console.log("you are at the top or bottom and cannot therefore move right");
                    
                } else if (keyName === "ArrowLeft"){                        
                    console.log("you are at the top or bottom and cannot therefore move left");
                }
            }
        }
      //  this.forceUpdate();
       // this.props.setPath(path); 
        //debugger;
    }
    handleSelect = (event, section) => {
     //   event.stopPropagation();
        //debugger;
        console.log(section.id, " has been focused")
        
        this.props.setCurrentSection({id: section.id, prev_id: this.sectionList[this.sectionList.length - 1]})//.then(
            //debugger;
            // () => {
            //     if (this.props.sectionCurrent.id !== 0){
            //         this.props.replaceSectionWithForm({valid: false});
            //     }
            // }
       // );
        //console.log(this.props.sectionCurrent.id," (this.props.sectionCurrent.id) shouldn't be 0")
        //this only words when you click twice away from form...
        if (this.props.sectionCurrent.id !== 0){
            this.props.replaceSectionWithForm({valid: false});
        }
       //debugger;
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
        
        let nextId = this.props.sections[0].id;
        let pointer = this.props.sections[0].id;
        
        let idHighestVotes = -1

        if (this.props.sectionCurrent){//&& this.props.sectionCurrent.id !== -1){
            //arrow down to bottom form (y-form)
            if(this.props.sectionCurrent.id === -1 && this.props.sectionCurrent.prev_id){
                pointer = this.props.sectionCurrent.prev_id
                this.formRef = true;
            }
            //submit bottom form (y-form)
            else if(this.props.sectionCurrent.id === -1){
                //debugger;
                pointer = this.sectionList[this.sectionList.length - 1];
                //this.formRef = true;
                //make form y focused
            }
            else if(this.props.sectionReplace.valid === true){
                //when we want to show an x-form, make sure that the parent of the x-form is the pointer so it and its ancestors will be shown.
                this.formRef = false;
                pointer = parseInt(this.props.sectionReplace.sectionToReplace.prev_id, 10);
            } else {
               this.formRef = false;
               pointer = this.props.sectionCurrent.id;
            }
        }

         const sectionCards =   this.props.sections.map(section =>{
                // 1st time: this will be equal
                if (section.id === nextId){
                    //section will be displayed based on these hierarchical rules.  Section is:
                    // 0. replaced by a form
                    // 1. pointed to (user has selected)
                    // 2. an ancestor of a pointed to section
                    // 3. has the most votes compared to those sections with the same section parent
                    
                    
                    const props = this.props
                   //0.
                    if (props.sectionReplace.valid && section.id === props.sectionReplace.sectionToReplace.id){
                        //this.props.replaceSectionWithForm({valid: false});
                        nextId = -1;
                        return < SectionForm divRef={el => this.divElement = el} key="0" section={{id: 0}} onDown={this.handleKeyDown} onSelect={this.handleSelect} sectionToAddTo={props.sectionReplace.sectionToReplace.prev_id} />
                    } else {
                        if(props.sectionReplace.valid && section.id === pointer){
                        //if we are at the parent of the node to be replaced with an x-form
                        //make the nextId be the sectionToReplace
                        nextId = props.sectionReplace.sectionToReplace.id;
                        }
                        //1:
                        else {
                            //debugger;
                            if(section.next_ids.find(sectId => sectId === pointer)){
                                nextId = pointer;
                            //2
                            } else if (section.next_ids.find(sectId => this.ancestorOfPointer(sectId, pointer))){//pointer has ancestor that is in section.next_ids) { //2:
                                nextId = section.next_ids.find(sectId => this.ancestorOfPointer(sectId, pointer));
                            } else { //3:
                                idHighestVotes = section.next_ids[0] //default is first in array
                                section.next_ids.forEach(nextid => {

                                    const segmentNext = this.props.sections.find(sect => sect.id === nextid)

                                    const segmentOfHighestVotes = this.props.sections.find(sect => sect.id === idHighestVotes)

                                    if(segmentNext && segmentOfHighestVotes && segmentNext.votes > segmentOfHighestVotes.votes){
                                        idHighestVotes = nextid;
                                    }
                                })
                                nextId = idHighestVotes;
                            }           
                        } 
                        let divRef = null;
                        if(section.id === pointer && !props.sectionReplace.valid && props.sectionCurrent.id !== -1 ){
                            //debugger;
                            divRef = (el) => this.divElement = el;
                        } 
                        //else {
                          //  return <SectionCard divRef={null} key={section.id} section={section} onVote={this.handleUpVote} onDown={this.handleKeyDown} onSelect={this.handleSelect} />; 
                        //}
                       // path.push(section.id);
                        return <SectionCard divRef={divRef} key={section.id} section={section} onVote={this.handleUpVote} onDown={this.handleKeyDown} onSelect={this.handleSelect} />; 
                        
                    } 
                } else {
                    return "";
                }
            }).filter(text => text !== "");

           // this.props.setPath(path);
            
            let sectionToAddTo = -5;
        
            //adds to the last rendered card when replaceSection = false.
            //add this: 
            //if replaceSection.valid = false
            if (sectionCards.slice(-1)[0]){
                sectionToAddTo = sectionCards.slice(-1)[0].key
            }       
            return {sectionCards, sectionToAddTo} ;
    }
//     updatePath = (sectionList) => {
// //        debugger;
//         path = [];
//         sectionList.forEach(section => {
//             path = [...path, parseInt(section.key, 10)]
//         });
//         //this.props.setPath(path);
//     }
  
    render() {
        //something can go here...
        //create path generating method, like the regular sort method
  //     let sectionList = [];
      // debugger;
  //     if(!this.props.loading){
  //          sectionList = this.sectionCards().sectionCards;
   //         this.updatePath(sectionList)
   //    }
        //debugger;
        return(
            <div ref={(el) => this.outerDiv = el}>
                <h1> Sections Component</h1>
                {this.props.loading ? "loading!!" : this.sectionCards().sectionCards} 

                {!this.props.loading && !this.props.sectionReplace.valid ? < SectionForm divRef={this.formRef ? (el) => this.divElement = el : null } section={{id: -1}} onDown={this.handleKeyDown} onSelect={this.handleSelect} sectionToAddTo={this.sectionCards().sectionToAddTo} /> : "" }
            </div>
        );
    }  
}

const mapStateToProps = (state) => {
    
    return ({
        loading: state.sections.loading,
        sections: state.sections,
        sectionCurrent: state.sectionCurrent,
        sectionReplace: state.sectionReplace,
        sectionPath: state.sectionPath
    });
}

export default connect(mapStateToProps, { getSections, upVoteSection, replaceSectionWithForm, setCurrentSection, setPath })(Sections);



