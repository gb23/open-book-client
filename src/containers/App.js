import React, { Component } from 'react';
import './App.css';
import Sections from './Sections.js';

//import {connect} from 'react-redux';

//const API_URL = process.env.REACT_APP_API_URL;

// const sections = [
//     {
//         text: "one text",
//         votes: 1,
//         next_ids: [2],
//     },
//     {
//         text: "two text",
//         votes: 2,
//         next_ids: [3]
//     },
//     {
//         text: "three text",
//         votes: 2,
//         next_ids: [-1]
//     },
// ];


// Really should be in components section because stateless and just rendering info
class App extends Component {
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         sections: [],
    //         loading: true
    //     }
    // }
//     componentDidMount(){
//       
//         // fetch(`${API_URL}/sections`)
//         //     .then(response => response.json())
//         //     //.then(sections => this.setState({sections: sections, loading: false }))
//    }
    render() {
        return (
            <div className="App">
            {/* { this.state.loading ?
                <h1>Loading...</h1>
                :
                <Sections sections={this.state.sections} />
            } */}
                <Sections />
            </div>
        );
    }
}

export default App;
// function mapStateToProps(state) {
//     console.log('in map state to props')
//     return {sections: state.sections}