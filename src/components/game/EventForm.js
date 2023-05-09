import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../../managers/EventManager.js"
import { createGame, getGameTypes, getGames, getGamers } from "../../managers/GameManager.js"

export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGame] = useState([])
    const [gamers, setGamers] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        gamerId: 0,
        gameId: 0
    })

    useEffect(() => {
        getGames()
        .then(data =>
            setGame(data))
    }, [])

    useEffect(() => {
        getGamers()
        .then(data => 
            setGamers(data))
    }, [])

    const changeEventState = (event) => {
        const copy = {...currentEvent}
        copy[event.target.name] = event.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" required autoFocus className="form-control"
                    value={currentEvent.description}
                    onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" name="date" required autoFocus className="form-control"
                    value={currentEvent.date}
                    onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="time" name="time" required autoFocus className="form-control"
                    value={currentEvent.time}
                    onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gamer">Organizer:</label>
                    <select name="gamerId"onChange={changeEventState}>
                        <option value ="0" />
                        {gamers.map((gamer) => <option value={gamer.id}id={gamer.id}>{gamer.full_name}</option>)}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game</label>
                    <select name="gameId"onChange={changeEventState}>
                        <option value ="0" />
                        {games.map((game) => <option value={game.id}id={game.id}>{game.title}</option>)}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        gamerId: parseInt(currentEvent.gamerId),
                        gameId: parseInt(currentEvent.gameId)

                    }
                    createEvent(event)
                    .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
