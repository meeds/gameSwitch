import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

export function configureStore(initialState) {
    return createStore(rootReducer,initialState,applyMiddleware(thunk));
}