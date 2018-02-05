import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './Sections.css'
import SectionCard from '../components/SectionCard'
import { getSections, upVoteSection, moveSectionRight, moveSectionLeft, setCurrentSection } from '../actions/sections';
import SectionForm from './SectionForm'

//clsdd because using lifecycle component did mount
class Sections extends Component{

    componentDidMount() {
        this.props.getSections(); 
       // debugger;
    }
    componentDidUpdate() {
        this.props.SectionCurrent && this.props.SectionCurrent.focus();
    }
    handleUpVote = (sectionId) => {
        const sectionAddVote = this.props.sections.filter(section => section.id === sectionId);
        this.props.upVoteSection(...sectionAddVote);
        //todo:
        //set store's currentId to this sectionId
    }
    handleKeyDown = (event, section) => {
        // if sectionId === store's section, you are good
        console.log("section had a select:", section.id)
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
            if(section.prev_id > 0){
                console.log("not the top!");
                //if inside here, the card that was selected when '-->' pressed has a parent node
                //get parent node:
                const parentId = section.prev_id
                const parentSection = this.props.sections.find(section => section.id === parentId);
                const sectionIdIndexInNextID = parentSection.next_ids.indexOf(section.id)
                
                    //check if current section id is not last item in parent node's next_ids (for right arrow) OR is not first item (for left arrow).
                const boundary = this.nextIdBoundary(keyName, parentSection);
                    if(sectionIdIndexInNextID !== boundary.index){
                        console.log("you move", boundary.direction)
                        // find the next section (the one that will be arrowed over to)
                        const nextId = this.getNextId(parentSection, sectionIdIndexInNextID, boundary.direction)
                        const nextSection = this.props.sections.find(section => section.id === nextId);//this.getNextId(parentSection, sectionIdIndexInNextID, boundary.direction));//nextId);
                        this.props.setCurrentSection(nextSection);
                    } else {
                        // else is last item in parent node's next_ids and cannot move right/left anymore.add UI animation so user knows can't arrow right/left.
                        console.log("you cannot move", boundary.direction);
                    }
               
                
            } else {
                if(keyName === "ArrowRight"){
                    //you cannot arrow right because you are on the parent of all nodes.  add UI animation so user knows can't arrow right.
                    console.log("you are at the top and cannot therefore move right");
                    
                } else {
                    console.log("you are at the top and cannot therefore move left");
                }
                
            }
    }
    handleSelect = (event, section) => {

        this.props.setCurrentSection(section);
    }
    sectionCards = () => {
        // return (
        //     this.props.sections.map(section => 
        //         <SectionCard key={section.id} section={section} onVote={this.handleUpVote} onDown={this.handleKeyDown} onSelect={this.handleSelect} />
        //     )
        // );
        //debugger;
        let nextId = 0;
        if (this.props.sections[0] !== undefined){
            nextId = this.props.sections[0].id;
        }
       
        
        let idHighestVotes = -1
        
        //stubbed!
        let pointer = 1;//change this once you figure out how to set sectionCurrent on initial runthrough.  Cannot set current state inside render()
        if (this.props.sectionCurrent !== undefined ){
        //     debugger;
        //     //this.props.setCurrentSection(this.props.sections[0]);
               pointer = this.props.sectionCurrent.id;
        }
       
        
         const sectionCards =   this.props.sections.map(section =>{
                // 1st time: this will be equal
                //debugger;
                if (section.id === nextId){

                    if(section.next_ids.find(sect => sect === pointer)){
                        nextId = pointer;
                    } else {
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
                    return <SectionCard  key={section.id} section={section} onVote={this.handleUpVote} onDown={this.handleKeyDown} onSelect={this.handleSelect} />;               
                }
                else {
                    return "";
                }
            }).filter(text => text !== "");
            return sectionCards;
    }

    render() {
        return(
            <div >
                <h1> Sections Component</h1>
                {this.sectionCards()}
                {/* <SectionCards /> */}
                <SectionForm />
            </div>
            
        );
    }  
}

const mapStateToProps = (state) => {
    return ({
        sections: state.sections,
        sectionCurrent: state.sectionCurrent
    });
}

export default connect(mapStateToProps, { getSections, upVoteSection, moveSectionRight, moveSectionLeft, setCurrentSection })(Sections);



