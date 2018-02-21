import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import NavBar from '../components/NavBar'
import About from '../components/About'
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
                        <Route exact path="/" render={() => <Redirect to="/about" />} />
                        <Route exact path="/compositions" render={() => <Redirect to="/compositions/:id" />} />
                        <Route exact path="/compositions/:id" component={Sections} />
                        
                        <Route exact path="/about" component={About} />
                        <Route exact path="/stitch" render={() => <div>Stitch</div>} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </ConnectedRouter>
        );
    }
}

export default App;
