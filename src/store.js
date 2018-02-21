import { createStore,applyMiddleware,combineReducers } from 'redux'
import thunk from 'redux-thunk';
import sections from './reducers/sections';
import sectionFormData from './reducers/sectionFormData';
import sectionCurrent from './reducers/sectionCurrent';
import composition from './reducers/composition';
import {  routerMiddleware} from 'react-router-redux'
//, push 
//routerReducer,
import createHistory from 'history/createBrowserHistory'
//import sectionPath from './reducers/sectionPath';
export const history = createHistory()
const middleware = [thunk, routerMiddleware(history)];

const reducers = combineReducers({
    sections,
    sectionFormData,
    sectionCurrent,
    composition,
   
})
// router: routerReducer

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);
//store.dispatch(push('/about'))
export default store;