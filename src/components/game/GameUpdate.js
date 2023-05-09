import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getGameTypes, getSingleGame, updateGame} from '../../managers/GameManager'

export const UpdateGame = () => {
    const { gameId } = useParams();
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const [game, setGame] = useState({})
    const [currentGame, setCurrentGame] = useState({
        title: '',
        maker: '',
        number_of_players: '',
        skill_level: '',
        game_type: 0
    })
    useEffect(() => {
        getSingleGame(gameId)
        .then((response) => {
            setGame(response)
            setCurrentGame({
                ...currentGame,
                title: response.title,
                maker: response.maker,
                number_of_players: response.number_of_players,
                skill_level: response.skill_level,
                game_type: parseInt(response?.game_type?.id)
            })
        })
    }, [gameId])

    useEffect(() => {
        getGameTypes()
        .then((data) => {
            setGameTypes(data)
        })
    }, [])

    const changeGameState = (event) => {
        const { name, value } = event.target
        setCurrentGame({ ...currentGame, [event.target.name]: value})
    }

    return (
        <form className='gameForm'>
            <h2 className='gameForm__description'>Update Game</h2>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input
                    type='text'
                    name='title'
                    required
                    autoFocus
                    className='form-control'
                    value={currentGame.title}
                    placeholder={game.title}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='maker'>Maker</label>
                    <input
                    type='text'
                    name='maker'
                    placeholder={game.maker}
                    required
                    autoFocus
                    className='form-control'
                    value={currentGame.maker}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='number_of_players'>Number of Players</label>
                    <input
                    type='number'
                    name='number_of_players'
                    placeholder={game.number_of_players}
                    required
                    autoFocus
                    className='form-control'
                    value={currentGame.number_of_players}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='skill_level'>Skill Level</label>
                    <input
                    type='number'
                    name='skill_level'
                    placeholder={game.skill_level}
                    required
                    autoFocus
                    className='form-control'
                    value={currentGame.skill_level}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                 <div className="form-group">
                 <label htmlFor="game_type">Game Type: </label>
                 <select name="game_type" onChange={changeGameState}>
                <option defaultValue={game?.game_type?.id}>{game?.game_type?.label}</option>
                {gameTypes.map((game_type) => (
                <option key={game_type.id} value={game_type.id}>
                {game_type.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <button
      type='submit'
      onClick={(event) => {
        event.preventDefault()

        const game = {
            title: currentGame.title,
            maker: currentGame.maker,
            number_of_players: currentGame.number_of_players,
            skill_level: currentGame.skill_level,
            game_type: parseInt(currentGame.game_type)
        }
        updateGame(game, gameId)
        .then(() => navigate('/games'))
      }}
      className='btn btn-primary'>
        Update Game
      </button>
        </form>
    )
}