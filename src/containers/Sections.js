import React, { Component } from 'react';
import './Sections.css'
import { Route } from 'react-router-dom';
// Switch
import { connect } from 'react-redux';

import SectionCard from '../components/SectionCard'
import Loading from '../components/Loading'
import CompositionLabel from '../components/CompositionLabel'
import { getSections, upVoteSection, setCurrentSection, notLoading, } from '../actions/sections';
import { setComposition } from '../actions/composition';
import SectionForm from './SectionForm'
import { push } from 'react-router-redux'

class Sections extends Component{
    constructor(props){
        super(props);
        this.sectionList = [];
        this.formRef = false;
        this.warning = false;
        //this.horizontal = false;
        //this.YpositionOld = 0;
        this.Yposition = null;
        // this.arrowRight = false;
    }
    componentDidMount() {
        //loading made true in getSections
        //debugger;
        this.props.getSections().then(() => {
            let urlId = null
            if(this.props.match.params.id){
                urlId = this.props.match.params.id
            }
            if(this.handleCompositions(urlId, this.props.sections.list)){
                const composition = this.props.sections.list.find(section => section.id === this.props.composition.currentId)
                this.props.setCurrentSection({...composition, valid: false})
            }
            //loading made true in getSections, now make it untrue  
            this.props.notLoading();
        
        })
       
    }
    // componentWillUpdate() {
    //     let el = document.getElementById('filler')
    //     if (el){
    //         el.remove();
    //     }
    //     //add filler div below lowest content div to prevent an up/down translation when arrowing horizontally
    //     let div = document.createElement("div");
    //     div.style.height = "1000px";
    //     div.setAttribute("id", "filler");
    //     document.getElementById('content').appendChild(div)
    //     document.body.appendChild(div);

    //     if(this.divElement){
    //          //set position to be the same when arrowing horizontally
    //             //debugger;
                
            
            
    //         this.Yposition = this.divElement.getBoundingClientRect().top

    //         console.log("Yposition WILL = ", this.Yposition);

    //     }

    // }
    componentDidUpdate() {
        
        let el = document.getElementById('filler')
        if (el){
            el.remove();
        }
        

        if(this.divElement ){ //if 
            //set position to be the same when arrowing horizontally
            // if(this.Yposition === 0 || this.Yposition){
            //     //debugger;
            //     console.log("Yposition DID = ", this.Yposition);
            //     this.divElement.style.position = "relative"
            //     this.divElement.style.top = this.Yposition;
            //     this.Yposition = null;
            // }
            // 
            // this.Yposition = this.divElement.getBoundingClientRect().top

 //add filler div below lowest content div to prevent an up/down translation when arrowing horizontally
            let div = document.createElement("div");
            div.style.height = "700px";
            div.setAttribute("id", "filler");
            document.getElementById('content').appendChild(div)
            document.body.appendChild(div);

           //fit card onto top if it is cut off in the viewport
            if (this.divElement.getBoundingClientRect().top < 0){
                    this.divElement.scrollIntoView(true); //true means put it on the top of the viewport
            }
            
            let classListOriginal = this.divElement.className.replace(/warningRed/g, "");
            //debugger;

            console.log("original classList", this.divElement.className)
            if (this.warning === true){
     //           debugger;
                const classListNew = classListOriginal + " warningRed"
                this.divElement.className = classListNew;
                setTimeout(() => {
                    this.divElement.className = classListOriginal;
                    this.warning = false;
                }, 100)
            }

            if(this.divElement.firstChild.elements){
                //for a card with a form, focus the form
                this.divElement.firstChild.elements[0].focus()

            } 
            else {
                //focus a card that doesn't have a form
                this.divElement.focus();
            }
            
            
        }
        // else if (this.formRef){
        //     const classListOriginal = this.formRef.className.replace(/warningRed/g, "");
        //     if (this.warning === true){
        //         debugger;
        //         const classListNew = classListOriginal + " warningRed"
        //         this.formRef.className = classListNew;
        //         setTimeout(() => {
        //             this.formRef.className = classListOriginal;
        //             this.warning = false;
        //         }, 100)
        //     }
        // }
        //debugger;
        this.formRef = false;
        this.sectionList = [];
        if(!this.props.loading){
            this.sectionCards().sectionCards.forEach(section => {
                this.sectionList = [...this.sectionList, parseInt(section.key, 10)];
                //debugger;
            });
        }        
    }
    handleBrowserButtonNavigation = (urlId) => {
        if(urlId !== ":id" && urlId !== "new" && urlId !== "about"){
            const compositionLoc = parseInt(urlId, 10);
            if (typeof(compositionLoc) === "number"){
                //get the id located at compositionIndex
                const sectionId = this.props.composition.ids[compositionLoc - 1];
                //set the composition current id to this id
                this.props.setComposition({...this.props.composition, currentId: sectionId})
                //get the section with the id
                const section = this.props.sections.list.find(section => section.id === sectionId);
                //set the current section to the section
                this.props.setCurrentSection(section);
            }
        }
        else if (urlId === "new"){
            const section = {valid: true, id: 0, prev_id: -1, sectionToReplace: {id: 0, prev_id: -1}};
            this.props.setCurrentSection(section);
        }
        else if (urlId === ":id"){
            let highestVote = -1;
            let compIdWithHighestVote = -1;
            const compositions = this.props.composition.ids.map(id => {
                return this.props.sections.list.find(section => section.id === id)
            })
            compositions.forEach(comp => {
                if(comp.votes > highestVote){
                    highestVote = comp.votes
                    compIdWithHighestVote = comp.id
                }
            });
            // const newUrlId = this.props.composition.ids.indexOf(compIdWithHighestVote) + 1;
            const section = this.props.sections.list.find(section => section.id === compIdWithHighestVote)
            
            this.props.setCurrentSection(section);
            this.props.setComposition({...this.props.composition, currentId: compIdWithHighestVote})
        }
        else if (urlId === "about"){
            const section = this.props.sections.list.find(section => section.id === this.props.composition.ids[0])
            this.props.setCurrentSection(section);
            this.props.setComposition({...this.props.composition, currentId: this.props.composition.ids[0]})
        }
    }
    handleCompositions = (urlId = null, sections) => {
        const compositions = sections.filter(section => section.prev_id === -1);
        const aboutCompositions = sections.filter(section => section.prev_id === -2);
        let ids = [];
        let aboutIds = [];
        let highestVote = -1;
       //let aboutHighestVote = -1;
        let compIdWithHighestVote = -1;
        //let aboutCompIdWithHighestVote = -1;

        let valid = false;  //checks if urlId is valid

        compositions.forEach( comp => {
            ids = [...ids, comp.id]
            if(comp.votes > highestVote){
                highestVote = comp.votes
                compIdWithHighestVote = comp.id
            }
        }) 
        aboutCompositions.forEach( comp => {
            aboutIds = [...aboutIds, comp.id]
            // if(comp.votes > aboutHighestVote){
            //     aboutHighestVote = comp.votes
            //     aboutCompIdWithHighestVote = comp.id
            // }
        })
        //debugger;  
        if (urlId === "new"){
            this.props.setComposition({ids: ids, currentId: ids[ids.length - 1]});
            this.props.setCurrentSection({valid: true, id: 0, prev_id: -1, sectionToReplace: {id: 0, prev_id: -1}})
            valid = false;
        }
        else {
            const urlNumber = parseInt(urlId,10)
            if(urlNumber > 0 && urlNumber <= ids.length){
                const sectionId = ids[urlNumber - 1]
                this.props.setComposition({ids: ids, currentId: sectionId});
            }
            else if (urlId === "about"){
                //debugger;
                this.props.setComposition({ids: aboutIds, currentId: aboutIds[0]});
                    
                
            }
            else {  
                //url is just "/compositions or is /compositions/:id".  need to append it with the comp index of highest vote. ex: "/compositions/2"
                //debugger;
                this.props.setComposition({ids: ids, currentId: compIdWithHighestVote})
                this.props.push(`/compositions/${ids.indexOf(compIdWithHighestVote)+1}`)  
                
            }
            valid = true;
        }
        return valid;
    }
    handleUpVote = (sectionId) => {
        //debugger;
        const sectionAddVote = this.props.sections.list.filter(section => section.id === sectionId);
        this.props.upVoteSection(...sectionAddVote);
        //debugger;
        //this.props.setCurrentSection(sectionAddVote);
    }
    handleKeyDown = (event, section) => {
        
        if (section){
            console.log("section had a keyDown:", section.id)
            console.log(event.key);
        }
        
        //debugger;
        if (section && (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "ArrowUp")){
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
            //find sectionCurrent index in sectionList
            const lastIndex = this.sectionList.length - 1;
            const currentIndex = this.sectionList.indexOf(this.props.sectionCurrent.id)
            let nextId = null;
            //if first, only enable down arrow
            if (currentIndex === 0 && this.sectionList.length > 1){
                if(keyName === "ArrowDown"){
                    nextId = this.sectionList[currentIndex + 1];
                }  
                else if(keyName === "ArrowUp"){
                    //debugger;
                    this.warning = true;
                    this.props.setCurrentSection(this.props.sectionCurrent)
                }
            }
            //else you're on an x-form.  can arrow up only
            else if (currentIndex === lastIndex && this.props.sectionCurrent.id === 0 && this.sectionList.length >= 1){
                //debugger;
                if (keyName === "ArrowUp" ){
                    if (currentIndex !== 0){
                        nextId = this.sectionList[lastIndex - 1]
                    }
                    else {
                        this.warning = true;
                        this.props.setCurrentSection(this.props.sectionCurrent)
                    }   
                }

                else if (keyName === "ArrowDown"){
                    this.warning = true;
                    this.props.setCurrentSection(this.props.sectionCurrent)
                }
             
            }
            //else if you're on last and last isn't 0, there's the y-form to go to
            else if(currentIndex === lastIndex && this.props.sectionCurrent.id !== 0 && keyName === "ArrowDown" && this.sectionList.length >= 1 ){
                
                    nextId = -1;
            }
            //else if you are on a y-form and you arrow up, go to last index of sectionList
            else if(this.props.sectionCurrent.id === -1 && this.sectionList.length >= 1){
                if(keyName === "ArrowUp"){
                   // debugger;
                    nextId = this.sectionList[lastIndex]
                }
                else if (keyName === "ArrowDown"){
                    this.warning = true;
                    this.formRef = true;
                    this.props.setCurrentSection(this.props.sectionCurrent)
                }
            }
            else if(keyName === "ArrowUp" && this.sectionList.length > 1){
                nextId = this.sectionList[currentIndex - 1];
            }
            else if(keyName === "ArrowUp" && this.sectionList.length === 1){
                this.warning = true;
                this.props.setCurrentSection(this.props.sectionCurrent)
            }
            else if(keyName === "ArrowDown" && this.sectionList.length >= 1){
                nextId = this.sectionList[currentIndex + 1];
            }
            if(nextId){
                if (nextId < 1){
                    const prevID = this.props.sections.list.find(section => section.id === this.sectionList[lastIndex]).id;
                    this.props.setCurrentSection({id: -1, prev_id: prevID, next_ids:[-1], valid: false});
                } else {
                    const nextSection = this.props.sections.list.find(section => section.id === nextId);
                    this.props.setCurrentSection({...nextSection, valid: false});
                }
            }
            
            

        } else if (keyName === "ArrowLeft" || keyName === "ArrowRight"){

 //           this.Yposition = this.divElement.getBoundingClientRect().top
            //debugger;
            if(section.id === 0){
               // debugger;
               if(this.props.sectionCurrent.prev_id !== -1 && this.props.sectionCurrent.prev_id !== -2){
                        //debugger;
                    //this means we are arrowing while on a compose card
                    let nextSection = null;
                    const parentSection = this.props.sections.list.find(sec => sec.id === parseInt(this.props.sectionCurrent.sectionToReplace.prev_id, 10))
                    //this.props.sectionReplace.sectionToReplace.prev_id,
                    if(keyName === "ArrowLeft"){
                        // if left arrow, go to the parent' last next_id
                    
                            nextSection = this.props.sections.list.find(section => section.id === parentSection.next_ids[parentSection.next_ids.length - 1]);
                           
                //        this.props.setCurrentSection(nextSection)
                        
                    } 
                    else if (keyName === "ArrowRight"){
                        // if right arrow, go to the parents first next_id
                            nextSection = this.props.sections.list.find(section => section.id === parentSection.next_ids[0]);
                          
            //          this.props.setCurrentSection(nextSection)
                    }
                

                    //debugger;
                    this.props.setCurrentSection({...nextSection, valid: false})
                //   this.props.replaceSectionWithForm({valid: false})
                    // this.arrowRight = true;
                    console.log("sectionCurrent is false")
                    //debugger;
               }
               else {
                    //you are on a x-form to create a brand new composition
                    
                    let compId = null;
                    //debugger;
                    if(keyName === "ArrowLeft"){
                        //arrow left will bring to last composition
                        compId = this.props.composition.ids[this.props.composition.ids.length - 1]

                    }
                    else if (keyName === "ArrowRight"){
                        compId = this.props.composition.ids[0]
                    }
                    const nextSection = this.props.sections.list.find(sec => sec.id === compId);
                    this.props.setCurrentSection({...nextSection, valid: false})
                    this.props.setComposition({...this.props.composition, currentId: nextSection.id});
                    //debugger;
                    console.log("sectionCurrent is false")


                    if(this.props.match.params.id === "about"){
                     //   this.props.push(`/compositions/about`);  
                    }
                    else{
                        this.props.push(`/compositions/${this.props.composition.ids.indexOf(compId) + 1}`) 
                    }
                }
            } else if(section.prev_id >= 0){
            
                console.log("not the top!");
                //if inside here, the card that was selected when '-->' pressed has a parent node
                //get parent node:
            
                //debugger;
                const parentSection = this.props.sections.list.find(sec => sec.id === section.prev_id);

                const sectionIdIndexInNextID = parentSection.next_ids.indexOf(section.id)
                    //check if current section id is not last item in parent node's next_ids (for right arrow) OR is not first item (for left arrow).
                const boundary = this.nextIdBoundary(keyName, parentSection);
                    if(sectionIdIndexInNextID !== boundary.index){
                        console.log("you move", boundary.direction)
                        // find the next section (the one that will be arrowed over to)
                        const nextId = this.getNextId(parentSection, sectionIdIndexInNextID, boundary.direction)
                    
                        
                        const nextSection = this.props.sections.list.find(section => section.id === nextId);//this.getNextId(parentSection, sectionIdIndexInNextID, boundary.direction));//nextId);
                       // debugger;
                    //    this.arrowRight = true;
                    //     this.props.setCurrentSection(this.props.sectionCurrent);

                        
                        
                        // if(nextSection){
                            this.props.setCurrentSection(nextSection);
            //             } else {
            //                 console.log("if this code never gets hit, you should delete it")
            //                 debugger;
            //                 //set redux state replaceSection = {valid: true, sectionToReplace: sectionCurrent};
            //                 // trigger re-render
            //                 this.props.setCurrentSection({valid: true, sectionToReplace: this.props.sectionCurrent, id: 0})
            // //              this.props.replaceSectionWithForm({valid: true, sectionToReplace: this.props.sectionCurrent});
            //             }
                    } else { //elseif boundary.index
                        //console.log("you can move,  boundary.direction")
                      //  this.props.replaceSectionWithForm({valid: true, sectionToReplace: this.props.sectionCurrent});
                        this.props.setCurrentSection({valid: true, sectionToReplace: this.props.sectionCurrent,id: 0})
                        // else is last item in parent node's next_ids and cannot move right/left anymore.add UI animation so user knows can't arrow right/left.
                        console.log("you 'move'", boundary.direction);
                    }  
            } else {
                const currentCompIndex = this.props.composition.ids.indexOf(this.props.composition.currentId);
                const compArraySize = this.props.composition.ids.length;

                if(keyName === "ArrowRight"){
        
                    
                    if (section.id === -1){
                        console.log("you are at the bottom and cannot therefore move right");
                        this.formRef = true;
                        this.warning = true;
                        
                        this.props.setCurrentSection({...this.props.sectionCurrent, valid: false});
      
                    }
                    else {
                        console.log("you are at the top and move right");
                        // you are at the top and are arrowing right
                        //if there are more compositions to arrow right to:
                        if (currentCompIndex !== compArraySize - 1){
                            
                            const composition = this.props.sections.list.find(comp => comp.id === this.props.composition.ids[currentCompIndex + 1])
                            
                            //debugger;
                            if(this.props.match.params.id === "about"){
                                this.props.setCurrentSection({...composition, prev_id: -2, valid: false})
                                this.props.setComposition({...this.props.composition, currentId: this.props.composition.ids[currentCompIndex + 1]});
                              //  this.props.push(`/compositions/about`);  
                            }
                            else{
                                this.props.setCurrentSection({...composition, prev_id: -1, valid: false})
                                this.props.setComposition({...this.props.composition, currentId: this.props.composition.ids[currentCompIndex + 1]});
                                this.props.push(`/compositions/${this.props.composition.ids.indexOf(composition.id) + 1}`);  
                            }
                            
                        }
                        //you are at the right end of the composition array.  Arrowing right will produce a new composition form
                        else {
                            //debugger;
                            const composition = this.props.sections.list.find(comp => comp.id === this.props.composition.ids[currentCompIndex])

                            if(this.props.match.params.id === "about"){
                                this.props.setCurrentSection({valid: true, sectionToReplace: composition, id: 0, prev_id: -2})
                           //     this.props.push(`/compositions/about`);  
                            }
                            else{
                                this.props.setCurrentSection({valid: true, sectionToReplace: composition, id: 0, prev_id: -1})
                                this.props.push("/compositions/new")  
                            }


                            
                        }
                    }
                } else if (keyName === "ArrowLeft"){                        
                    if (section.id === -1){
                        console.log("you are at the bottom and cannot therefore move left");
                        this.warning = true;
                        this.formRef = true;
                        this.props.setCurrentSection({...this.props.sectionCurrent, valid: false});
                    }
                    else {
                        console.log("you are at the top and move left");
                        // you are at the top and are arrowing left
                        if (currentCompIndex !== 0){
                            
                            const composition = this.props.sections.list.find(comp => comp.id === this.props.composition.ids[currentCompIndex - 1])
                            
                            //debugger;
                            if(this.props.match.params.id === "about"){
                                this.props.setCurrentSection({...composition, prev_id: -2, valid: false})
                                this.props.setComposition({...this.props.composition, currentId: this.props.composition.ids[currentCompIndex - 1]});
                                //this.props.push(`/compositions/about`);  
                            }
                            else{
                                this.props.setCurrentSection({...composition, prev_id: -1, valid: false})
                                this.props.setComposition({...this.props.composition, currentId: this.props.composition.ids[currentCompIndex - 1]});
                                this.props.push(`/compositions/${this.props.composition.ids.indexOf(composition.id) + 1}`);  
                            }        
                        } 
                        //you are at the left end of the composition array.  Arrowing left will produce a new composition form
                        else {
                            const composition = this.props.sections.list.find(comp => comp.id === this.props.composition.ids[currentCompIndex])
                            //debugger;
                            if(this.props.match.params.id === "about"){
                                this.props.setCurrentSection({valid: true, sectionToReplace: composition, id: 0, prev_id: -2})
                                //this.props.push(`/compositions/about`);  
                            }
                            else{
                                this.props.setCurrentSection({valid: true, sectionToReplace: composition, id: 0, prev_id: -1})
                                this.props.push("/compositions/new")  
                            }
                        }
                    }
                }
            }
        }
    }
    handleSelect = (event, section) => {
        console.log(section.id, " has been clicked")
        //event.stopPropagation();
        //debugger;

        if (section.id === 0){
            this.props.setCurrentSection(this.props.sectionCurrent);
        }
        else {
            this.props.setCurrentSection({...section, valid: false})
            // if(section.id === -1){
            //     this.formRef = true;
            // }
        }
      
    }
    ancestorOfPointer = (sectId, pointer) => {
        let done = false;
        let found = false;
        let checkId = pointer;
        const locateSection = (checkId) => {
            return this.props.sections.list.find(section => section.id === checkId)
        }
        while (!done && sectId !== -1 && sectId !== -2){
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
        let currentComp = null
        let composition = [];
        let nextId = null;
        let pointer = null;

        // if (urlId !== "new" && urlId !== ":id"){
            //const compositionIndexInArray = parseInt(urlId, 10); //urlId === 5.  this.composition.ids = [1,5,17,19,*24]
            //const compositionSectionId = this.props.composition.ids[compositionIndexInArray] //24
            //const currentCompIndex = this.props.sections.list.indexOf(compositionSectionId);
        // }
        // else{
            //debugger;
            currentComp = this.props.sections.list.find(section => section.id === this.props.composition.currentId);
            if (this.props.sectionCurrent.id === 0 && this.props.sectionCurrent.sectionToReplace.id === 0){
                //this is if user directly types in url .../compositions/new
                composition = [this.props.sectionCurrent];
                nextId = this.props.sectionCurrent.id
            } else {
                
    
                const currentCompIndex = this.props.sections.list.indexOf(currentComp);
    
                composition = this.props.sections.list.slice(currentCompIndex);
                nextId = composition[0].id;
                pointer = composition[0].id;
                
            }
        // }
        
        let idHighestVotes = -1
       // debugger;
        if (this.props.sectionCurrent){
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
            //newly created from form will have an id that isn't yet part of this.props.sections. (it is one larger than the last)
            // else if (this.props.sectionCurrent.id === this.props.sections.list[this.props.sections.list.length - 1].id + 1){
            //     console.log("THIS SHOULDN'T GET HIT");
            //     pointer = this.props.sectionCurrent.prev_id
            //    // const sectionToUpdate = this.props.sections.find(section => section.id === pointer)
            //    // sectionToUpdate.next_ids = [...sectionToUpdate.next_ids, this.props.sectionCurrent.id]
            //    // debugger;
            // }
            else if(this.props.sectionCurrent.valid === true && this.props.sectionCurrent.prev_id !== -1 && this.props.sectionCurrent.prev_id !== -2){
              //  if(this.props.sectionCurrent.prev_id === -1){
                    //this occurs when on a composition/new form
                  //  this.formRef = false;
                  //  pointer = -1;
                  //  debugger;
               // }
               // else{
                    //sectionReplace.valid === true){
                //when we want to show an x-form, make sure that the parent of the x-form is the pointer so it and its ancestors will be shown.
                this.formRef = false;
                pointer = parseInt(this.props.sectionCurrent.sectionToReplace.prev_id, 10);

              //  }
            } else {
               this.formRef = false;
              // if (this.sectionList.find(section => section.id === this.props.sectionCurrent.id)){
               pointer = this.props.sectionCurrent.id;
              // }
               
            }
        }
        
         //composition needs to contain one element.  this section.id needs to === nextId,
         //section.prev_id needs to equal -1
         //props.sectionCurrent.valid && section.id === props.sectionCurrent.sectionToReplace.id)
         //props.sectionCurrent.sectionToReplace.prev_id needs to equal -1
         const sectionCards =   composition.map(section =>{
                // 1st time: this will be equal
                if (section.id === nextId){
                    const props = this.props

                    //section will be displayed based on these hierarchical rules.  Section is:
                    // 0. replaced by a form
                    // 1. pointed to (user has selected)
                    // 2. an ancestor of a pointed to section
                    // 3. has the most votes compared to those sections with the same section parent
                        
                    
                        let prevSection = null
                        let totalCardsInRow = null
                        let locationInRow = null
                        
                       

                    if (section.prev_id !== -1 && section.prev_id !== -2){
                        //debugger;
                        prevSection = composition.find(sec => sec.id === section.prev_id)
                        if(prevSection){
                            totalCardsInRow = prevSection.next_ids.length;
                            locationInRow = prevSection.next_ids.indexOf(section.id) + 1 //location in next_Ids array
                        }
                        
                        
                    }
                    
                   //0.
                    if (props.sectionCurrent.valid && section.id === props.sectionCurrent.sectionToReplace.id){
                        //debugger;
                        //props.sectionReplace.sectionToReplace.id
                        //props.sectionReplace.valid
                        //this.props.replaceSectionWithForm({valid: false});
                        let label = "ADD VERSION"
                        if (section.prev_id === -1 || section.prev_id === -2){ //-2 if for the 'about' section compositions
                            label = "ADD COMPOSITION"
                        } 
                        nextId = -1;
                        return < SectionForm divRef={el => this.divElement = el} key="0" section={{id: 0}} url={this.props.match} onDown={this.handleKeyDown} onSelect={this.handleSelect} sectionToAddTo={props.sectionCurrent.sectionToReplace.prev_id} name={label} />
                        // sectionToAddTo={props.sectionReplace.sectionToReplace.prev_id} 
                    } else {
                        if(props.sectionCurrent.valid && section.id === pointer){
                            //props.sectionReplace.valid
                        //if we are at the parent of the node to be replaced with an x-form
                        //make the nextId be the sectionToReplace
                        nextId = props.sectionCurrent.sectionToReplace.id
                        //nextId = props.sectionReplace.sectionToReplace.id;
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

                                    const segmentNext = composition.find(sect => sect.id === nextid)

                                    const segmentOfHighestVotes = composition.find(sect => sect.id === idHighestVotes)

                                    if(segmentNext && segmentOfHighestVotes && segmentNext.votes > segmentOfHighestVotes.votes){
                                        idHighestVotes = nextid;
                                    }
                                })
                                nextId = idHighestVotes;
                            }           
                        } 
                        let divRef = null;
                        
                        if(section.id === pointer && !props.sectionCurrent.valid && props.sectionCurrent.id !== -1 ){
                            divRef = (el) => this.divElement = el;
                        } 
  
                        return <SectionCard divRef={divRef} location={locationInRow} total={totalCardsInRow} key={section.id} section={section} onVote={this.handleUpVote} onDown={this.handleKeyDown} onSelect={this.handleSelect} />; 
                        
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

    render() {
        //something can go here...
       // debugger;
        return( 
            <div id="content">
            {/* <Switch> */}
                 {/* <Route exact path={`${this.props.match.url}`}
                    render={()=>{
                 //   debugger;
                    return <div>{`Composition ${this.props.match.params.id}`}</div>}}
                /> */}
                 <Route path={`${this.props.match.url}`}
                    render={()=> 
                        {
                            //debugger;
                          return [< CompositionLabel urlId={this.props.match.params.id} comp={this.props.composition} section={this.props.sectionCurrent} key="-1"/>,
                                 !this.props.loading ? this.sectionCards().sectionCards : <Loading key="-2" />, 
                                 !this.props.loading && !this.props.sectionCurrent.valid ? 
                                     < SectionForm key="-3" divRef={this.formRef ? (el) => this.divElement = el : null } 
                                        section={{id: -1}} onDown={this.handleKeyDown} onSelect={this.handleSelect} 
                                        sectionToAddTo={this.sectionCards().sectionToAddTo} name="ADD CONTENT"
                                    /> 
                                    : ""
                                ]
                        }
                    }
                /> 
              
            {/* </Switch> */}
            </div>
        );
    }  
}

const mapStateToProps = (state, ownprops) => {
    //debugger;
    return ({
        sections: state.sections,
        loading: state.sections.loading,
        sectionCurrent: state.sectionCurrent,
        composition: state.composition,
        // url: state.router.location.pathname
    });
}
export default connect(mapStateToProps, { getSections, upVoteSection,  setCurrentSection, setComposition, notLoading, push })(Sections);

