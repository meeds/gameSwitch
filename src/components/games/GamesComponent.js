import React from 'react';
import GameComponent from './GameComponent';
import { NavLink } from 'react-router-dom';

class GamesComponent extends React.Component {

    getGamesElements() {
        const { handleDelete, handleAddOwner,handleRemoveOwner } = this.props;
        return this.props.games.map(game => (<GameComponent key={game.id} game={game} handleRemoveOwner={handleRemoveOwner} handleAddOwner={handleAddOwner} handleDelete={handleDelete}/>));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="twelve column">
                        <div className="actions">
                            <NavLink to="/new" className="button button-primary">new game</NavLink>
                        </div>
                    </div>
                </div>
                {this.getGamesElements()}
            </div>
        );
    }

}

export default GamesComponent;