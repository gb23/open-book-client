import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import NavBar from '../components/NavBar'
import Sections from './Sections.js';

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar />
                    {/* <Route exact path="/" render={()=> <div>home</div>} /> */}
                    <Route exact path="/" render={() => <Sections/>} />
                    <Route exact path="/about" render={() => <div>About</div>} />
                    <Route exact path="/stitch" render={() => <div>Stitch</div>} />
                </div>
            </Router>
        );
    }
}

export default App;
