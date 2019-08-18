import * as gameService from '../../api/gameService';
import * as Types from './actionTypes';

export function loadGames() {
    return async function (dispatch) {
        await gameService.getGames().then(games => {
            dispatch(loadGamesSuccess(games));
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}

export function saveGame(game) {
    return async function (dispatch) {
        await gameService.saveGame(game).then(savedGame => {
            if(game.id) {
                dispatch(updateGameSuccess(savedGame));
            }else {
                dispatch(createGameSuccess(savedGame));
            }
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}

export function addOwner(gameId,uid) {
    return async function (dispatch) {
        await gameService.addOwner(gameId,uid).then(savedGame => {
             dispatch(addOwnerSuccess(savedGame));
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}

export function removeOwner(gameId,uid) {
    return async function (dispatch) {
        await gameService.removeOwner(gameId,uid).then(savedGame => {
             dispatch(removeOwnerSuccess(savedGame));
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}

export function deleteGame(id) {
    return async function (dispatch) {
        await gameService.deleteGame(id).then(() => {
            dispatch(deleteGameSuccess(id));
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}

export function deleteGameSuccess(id) {
    return {
        type: Types.DELETE_GAMES_SUCCESS,
        deletedGameId: id
    }
}

export function loadGamesSuccess(games) {
    return {
        type: Types.LOAD_GAMES_SUCCESS,
        games
    }
}

export function createGameSuccess(game) {
    return {
        type: Types.CREATE_GAME_SUCCESS,
        game
    }
}

export function updateGameSuccess(game) {
    return {
        type: Types.UPDATE_GAME_SUCCESS,
        game
    }
}

export function addOwnerSuccess(game) {
    return {
        type: Types.ADD_OWNER_SUCCESS,
        game
    }
}

export function removeOwnerSuccess(game) {
    return {
        type: Types.REMOVE_OWNER_SUCCESS,
        game
    }
}