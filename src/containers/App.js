import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import NavBar from '../components/NavBar'
//import About from './About'
import NotFound from '../components/NotFound'
import Sections from './Sections.js';
import { history } from '../store.js'

class App extends Component {

    render() {
        //debugger;
        return (
            <ConnectedRouter history={history}>
                <div className="App">
                    <NavBar />
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/compositions/about" />} />
                        <Route exact path="/compositions" render={() => <Redirect to="/compositions/:id" />} />
                        <Route exact path="compositions/about" component={Sections} />
                        <Route exact path="/compositions/:id" component={Sections} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </ConnectedRouter>
        );
    }
}

export default App;
