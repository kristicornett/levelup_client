export const getGames = () => {
    return fetch('http://localhost:8000/games', {
        headers: {
            "Authorization": `Token ${localStorage.getItem('lu_token')}`
        }
    })
    .then(response => response.json())
}

export const getGamers = () => {
    return fetch('http://localhost:8000/gamers', {
        headers: {
            "Authorization": `Token ${localStorage.getItem('lu_token')}`
        }
    })
    .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(game)
    })
    .then(response => response.json())
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem('lu_token')}`
        }
    })
    .then(response => response.json())
}

export const getSingleGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('lu_token')}`
        }
    })
    .then(response => response.json())
}

export const updateGame = (updatedGame, gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('lu_token')}`
        },
        body: JSON.stringify(updatedGame)
    })
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    })
    .catch(error => 
        console.log(error))
        alert('There seems to be a problem')
}

export const deleteGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${localStorage.getItem('lu_token')}`
        }
    })
}

