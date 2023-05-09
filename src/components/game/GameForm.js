import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from "../../managers/GameManager.js"

export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    const [currentGame, setCurrentGame] = useState({
        title: "",
        maker: "",
        numberOfPlayers: 0,
        skillLevel: 1,
        gameTypeId: 0
        
    })
    useEffect(() => {
        getGameTypes()
        .then(data => 
            setGameTypes(data))
    }, [])

    const changeGameState = (event) => {
            
                const copy = {...currentGame }
                copy[event.target.name]= event.target.value
                setCurrentGame(copy)
            }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                    value={currentGame.title}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                    value={currentGame.maker}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                    value={currentGame.numberOfPlayers}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                    value={currentGame.skillLevel}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game Type: </label>
                    <input type="number" name="gameTypeId" required autoFocus className="form-control"
                    value={currentGame.gameTypeId}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}

