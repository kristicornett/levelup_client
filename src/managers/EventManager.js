export const getEvents = () => {
    return fetch('http://localhost:8000/events', {
        headers: {
            "Authorization": `Token ${localStorage.getItem('lu_token')}`
        }
    })
    .then(response => response.json())
}

export const createEvent = (event) => {
    return fetch('http://localhost:8000/events', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
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

export const updateEvent = (updatedEvent, eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('lu_token')}`
        },
        body: JSON.stringify(updatedEvent)
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



export const leaveEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem('lu_token')}`
      }
    }
    )
  }
export const joinEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem('lu_token')}`
      },
    })
      .then(res => res.json())
  }


export const getSingleEvent = (eventId) => {
    return fetch(`http://localhost:8000/games/${eventId}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('lu_token')}`
        }
    })
    .then(response => response.json())
}

export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${localStorage.getItem('lu_token')}`
        }
    })
}