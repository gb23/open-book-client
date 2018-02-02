import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Sections.css'
import SectionCard from '../components/SectionCard'
import { getSections, upVoteSection } from '../actions/sections';
import SectionForm from './SectionForm'

//clsdd because using lifecycle component did mount
class Sections extends Component{

    componentDidMount() {
        this.props.getSections(); 
    }

    handleUpVote = (sectionId) => {
        const sectionAddVote = this.props.sections.filter(section => section.id === sectionId);
        this.props.upVoteSection(...sectionAddVote);
    }
    render() {
        return(
            <div>
                
                <h1> Sections Component</h1>
                {this.props.sections.map(section => 
                    <SectionCard key={section.id} section={section} onVote={this.handleUpVote} />
                )}
                <SectionForm />
            </div>
            
        );
    }  
}

const mapStateToProps = (state) => {
    return ({
        sections: state.sections
    });
}

export default connect(mapStateToProps, { getSections, upVoteSection })(Sections);



