import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getGames, deleteGame } from '../../managers/GameManager'

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getGames()
        .then(data => 
            setGames(data))
    }, [])

    return (
        <article className="games">
            {
               
            }
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            navigate({ pathname: "/games/new" })
        }}
            >Register New Game</button>

            {
                games.map(game => {
                    return (
                        <section key={`game--${game.id}`} className='game'>
                            <div className='game__title'>
                                <h2><Link to={`/games/${game.id}/update`}>{game.title}</Link></h2>
                                by {game.maker}
                            </div>
                            <div className="game__players">
                                {game.number_of_players} players needed
                            </div>
                            <div className="game__skillLevel">
                                Skill level is {game.skill_level}
                            </div>
                            <button onClick={() => deleteGame(game.id)}>Delete</button>
                        </section>
                    )
                })
            }
        </article>
    )
}