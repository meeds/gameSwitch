import React from 'react';
import GameFormComponent from './GameFormComponent';
import { connect } from 'react-redux';
import { saveGame } from '../../../redux/actions/gamesActions';
import toastr from 'toastr';

class GameFormContainer extends React.Component {

    state = {
        saving: false,
        game: {
            ...this.props.game
        },
        errors: []
    }

    componentDidMount() {
        toastr.options = {
            positionClass: 'toast-top-full-width',
            hideDuration: 300,
            timeOut: 60000
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        if (form.checkValidity()) {

            this.setState({
                saving: true
            });

            this.props.saveGame(this.state.game).then(gameSaved => {
                toastr.success("Game saved successfully");
                this.setState({
                    saving: false,
                    errors: []
                });
                this.props.history.push("/");
            }).catch(error => {
                console.error(error);
                this.setState({
                    saving: false,
                    errors: [{ ...error }]
                });
            });
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            game: {
                ...this.state.game,
                [name]: value
            }
        });
    }

    render() {
        return (
            <GameFormComponent
                editMode= {this.props.editMode}
                saving={this.state.saving}
                game={this.state.game}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                errors={this.state.errors}
            />
        )
    }

}

function mapStateToProps(state, ownProps) {
    
    let editMode = false;

    let game = {
        id: null,
        title: '',
        editor: '',
        platform: '',
        pegi: '',
        releaseDate: '',
        description: "",
        photo: '',
        owners: []
    };

    if(ownProps.match.params.id) {
        const id = ownProps.match.params.id;
        game = state.games.find(g => g.id === parseInt(id));
        editMode = true;
    }
    
    return {
        editMode,
        game
    }
}

const mapDispatchToProps = {
    saveGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameFormContainer);