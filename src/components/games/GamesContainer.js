import React from 'react';
import GamesComponent from './GamesComponent';
import { connect } from 'react-redux';
import { loadGames,deleteGame,addOwner,removeOwner } from "../../redux/actions/gamesActions";
import Spinner from '../common/spinner/Spinner';
import Alert from '../common/alert/Alert';
import { UserContext } from '../../context/UserContext';

class GamesContainer extends React.Component {

    static contextType = UserContext;

    state = {
        gamesLoading: false
    }

    componentDidMount() {
        let { games } = this.props;
        if (games.length <= 0) {
            console.info("get games");
            this.setState({
                gamesLoading: true
            });

            this.props.loadGames().then(() => {
                this.setState({ gamesLoading: false });
            }).catch(error => {
                console.error(error);
                this.setState({ gamesLoading: false });
            });
        }
    }

    isLoading() {
        return this.state.gamesLoading;
    }

    isGamesListEmpty() {
        return !this.state.gamesLoading && this.props.games.length <= 0;
    }

    handleDelete= (e,id) => {
        e.preventDefault();
        this.props.deleteGame(id).catch((error) => {
            console.error(error);
        });
    }

    handleAddOwner = (e,id) => {
        e.preventDefault();
        const uid = this.context.profile.uid;
        this.props.addOwner(id,uid).catch((error) => {
            console.error(error);
        });
    }

    handleRemoveOwner = (e,id) => {
        e.preventDefault();
        const uid = this.context.profile.uid;
        this.props.removeOwner(id,uid).catch((error) => {
            console.error(error);
        });
    }

    render() {
        
        const isGamesListEmpty = this.isGamesListEmpty();
        const isLoading = this.isLoading();

        return (
            <>
                {isLoading ? (<Spinner />) : (<GamesComponent handleRemoveOwner={this.handleRemoveOwner} handleAddOwner={this.handleAddOwner} handleDelete={this.handleDelete} games={this.props.games}/>) }
                {isGamesListEmpty ? (<Alert>Ooops !! NO GAME IS AVAILABLE ...</Alert>) : (<></>) }
            </>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        games: state.games
    }
}

const mapDispatchToProps = {
    loadGames,
    deleteGame,
    addOwner,
    removeOwner
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);