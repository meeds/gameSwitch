const GAME_API_URL = "/api/game"

export async function getGameById(id) {
    return await fetch(`${GAME_API_URL}/${id}`,buildConfig('GET')).then(handleResponse);
}

export function getGames() {
    return fetch(GAME_API_URL,buildConfig('GET')).then(handleResponse);
}

export function addOwner(gameId, uid) {
    return fetch(`${GAME_API_URL}/${gameId}/owner/${uid}`, buildConfig('POST')).then(handleResponse);
}

export function removeOwner(gameId, uid) {
    return fetch(`${GAME_API_URL}/${gameId}/owner/${uid}`, buildConfig('DELETE')).then(handleResponse);
}

export function saveGame(game) {
    return fetch(GAME_API_URL, buildConfig('POST',game)).then(handleResponse);
}

export function deleteGame(id) {
    return fetch(GAME_API_URL + "/" + id, buildConfig('DELETE'));
}

function buildConfig(method = 'GET', body = null) {
    const currentUser = JSON.parse(localStorage.getItem("access_token"));
    debugger;
    const config = {
        method,
        headers: {
            "content-type": 'application/json',
            "X-Firebase-Auth": currentUser ? currentUser.userToken : ""
        }
    };

    if (body)
        config.body = JSON.stringify(body);
    return config;
}

function handleResponse(response) {
    let contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
        return handleJSONResponse(response);
    } else if (contentType && contentType.includes('text/html')) {
        return handleTextResponse(response);
    } else {
        // Other response types as necessary. I haven't found a need for them yet though.
        throw new Error(`Sorry, content - type ${contentType} not supported`);
    }
}

function handleJSONResponse(response) {
    return response.json()
        .then(json => {
            if (response.ok) {
                return json;
            } else {
                return Promise.reject(Object.assign({}, json, {
                    status: response.status,
                    statusText: response.statusText
                }))
            }
        });
}

function handleTextResponse(response) {
    return response.text()
        .then(text => {
            if (response.ok) {
                return text;
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                    err: text
                })
            }
        })
}

