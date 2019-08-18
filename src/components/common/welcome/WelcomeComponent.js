import React from 'react';

function WelcomeComponent(props) {
    return (
        <>
           <h3>{props.title}</h3>
            <p>
                A simple Proof of concept using React/Redux.
        </p>
            <ul>
                <li>I'm using BlackPerle CSS, <a target="_blank" rel="noopener noreferrer" href="https://github.com/meeds/BlackPerle">@BlackPerleCSS</a></li>
                <li>You can found the application source code <a target="_blank" rel="noopener noreferrer" href="https://github.com/meeds/gameSwitch">@GameSwitch</a></li>
            </ul>
        </>
    );
}

export default WelcomeComponent;