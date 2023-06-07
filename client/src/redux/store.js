import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;