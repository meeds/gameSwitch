import React from 'react';
import './GameComponent.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

class GameComponent extends React.Component {

    static contextType = UserContext;

    render() {
        const { game, handleDelete, handleAddOwner, handleRemoveOwner } = this.props;
        const isInMyCollection = game.owners.includes(this.context.profile.uid);
        return (
            <div className="segment">
                <div className="row">
                    <div className="eight wide column">
                        <h4>{game.title}</h4>
                        <ul>
                            <li><b>Editor</b> {game.editor}</li>
                            <li><b>Pegi</b> {game.pegi}</li>
                            <li><b>Platform</b> {game.platform}</li>
                            <li><b>Release date</b> {game.releaseDate}</li>
                        </ul>
                        <p>
                            {game.description}
                        </p>
                        <div className="row">
                            {
                                isInMyCollection ?
                                    (<div className="twelve column"><button className="button button-delete" onClick={(e) => handleRemoveOwner(e, game.id)}>remove from my collection</button></div>) :
                                    (<div className="twelve column"><button className="button" onClick={(e) => handleAddOwner(e, game.id)}>add to my collection</button></div>)
                            }
                        </div>
                        <div className="row">
                            <div className="six column">
                                <button className="button button-delete" style={{ marginBottom: '0.5rem' }} onClick={(e) => handleDelete(e, game.id)}>Delete</button>
                                &nbsp;
                                <NavLink to={"/edit/" + game.id} className="button button-edit">edit</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="four wide column segment raised">
                        <div className="game-image">
                            <img alt="" srcSet={game.photo} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameComponent;