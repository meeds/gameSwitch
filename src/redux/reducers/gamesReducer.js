import * as Types from '../actions/actionTypes';
import initialState from '../initialState';


function gamesReducer(state = initialState.games, action) {
    switch (action.type) {
        case Types.LOAD_GAMES_SUCCESS:
            return action.games;
        case Types.CREATE_GAME_SUCCESS:
            return [
                ...state,
                { ...action.game }
            ];
        case Types.DELETE_GAMES_SUCCESS:
            return state.filter(g => g.id !== action.deletedGameId);
        case Types.UPDATE_GAME_SUCCESS:
        case Types.ADD_OWNER_SUCCESS:
        case Types.REMOVE_OWNER_SUCCESS:
            return [
                ...state.filter(g => g.id !== action.game.id),
                { ...action.game }
            ];
        default:
            return state;
    }
}

export default gamesReducer;