import { combineReducers } from 'redux';
import games from './gamesReducer';

const rootReducer  = combineReducers({games});

export default rootReducer;