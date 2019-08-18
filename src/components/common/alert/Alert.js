import React from 'react';

function Alert(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="twelve column segment">
                    <h1>
                        {props.children}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Alert;