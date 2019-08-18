import React from 'react';
import GamesComponent from './GamesComponent';
import { connect } from 'react-redux';
import { loadGames, deleteGame, addOwner, removeOwner } from "../../redux/actions/gamesActions";
import Spinner from '../common/spinner/Spinner';
import Alert from '../common/alert/Alert';

class GamesOwnerContainer extends React.Component {

    state = {
        gamesLoading: false
    }

    componentDidMount() {
        let { games } = this.props;
        if (games.length <= 0) {

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

    handleRemoveOwner = (e, id) => {
        e.preventDefault();
        const uid = this.props.user.profile.uid;
        this.props.removeOwner(id, uid).catch((error) => {
            console.error(error);
        });
    }

    render() {

        const isGamesListEmpty = this.isGamesListEmpty();
        const isLoading = this.isLoading();

        return (
            <>
                {isLoading ? (<Spinner />) : (<GamesComponent handleRemoveOwner={this.handleRemoveOwner} handleAddOwner={this.handleAddOwner} handleDelete={this.handleDelete} games={this.props.games} />)}
                {isGamesListEmpty ? (<Alert>Ooops !! Your collection of games is empty ...</Alert>) : (<></>)}
            </>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const currentUID = ownProps.user.profile.uid;
    return {
        games: state.games.filter(g => g.owners.includes(currentUID))
    }
}

const mapDispatchToProps = {
    loadGames,
    removeOwner
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesOwnerContainer);