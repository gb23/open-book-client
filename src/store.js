import { createStore,applyMiddleware,combineReducers } from 'redux'
import thunk from 'redux-thunk';
import sections from './reducers/sections';
import sectionFormData from './reducers/sectionFormData';
import sectionCurrent from './reducers/sectionCurrent';

const middleware = [thunk];

const reducers = combineReducers({
    sections,
    sectionFormData,
    sectionCurrent
})

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);