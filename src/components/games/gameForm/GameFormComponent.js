import React from 'react';

const GameFormComponent = ({ handleChange, handleSubmit, game, saving, errors,editMode }) => {
    const showServerErrors = errors && errors.length > 0;

    return (
        <div className="container">
            <div className="row segment">
                <h3>{editMode ? 'EDIT GAME' : 'NEW GAME'}</h3>
                <form onSubmit={handleSubmit}>

                    {showServerErrors ? (
                        <div className="row">
                            <div className="twelve column">
                                <div className="alert error full-width">
                                    {
                                        errors.map(error => (<li key={error.timestamp}><b>{error.status}</b>: {error.message}</li>))
                                    }
                                </div>
                            </div>
                        </div>) : ''}

                    <div className="row">
                        <div className="six column">
                            <label>Title *</label>
                            <input value={game.title} onChange={handleChange} className="full-width" type="text" required name="title" />
                        </div>

                        <div className="six column">
                            <label>Editor *</label>
                            <input value={game.editor} onChange={handleChange} className="full-width" type="text" required name="editor" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="four column">
                            <label>Platform *</label>
                            <input value={game.platform} onChange={handleChange} className="full-width" type="text" required name="platform" />
                        </div>

                        <div className="four column">
                            <label>Pegi *</label>
                            <input value={game.pegi} onChange={handleChange} className="full-width" type="text" required name="pegi" />
                        </div>

                        <div className="four column">
                            <label>Release date *</label>
                            <input placeholder="Format YYYY-MM-dd" value={game.releaseDate} onChange={handleChange} className="full-width" type="text" required name="releaseDate" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="twelve column">
                            <label>Description *</label>
                            <textarea className="full-width" name="description" value={game.description} onChange={handleChange} required></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="twelve column">
                            <label>Photo *</label>
                            <input value={game.photo} placeholder="Type url here [.jpg/gif.png]" onChange={handleChange} pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)" className="full-width" type="text" required name="photo" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="twelve column">
                            <button disabled={saving} className="button button-primary">
                                {saving ? '...saving' : 'save'}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};


export default GameFormComponent;