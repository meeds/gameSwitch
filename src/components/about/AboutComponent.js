import React from 'react';
import WelcomeComponent from '../common/welcome/WelcomeComponent';

class AboutComponent extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="twelve column segment">
                        <WelcomeComponent title="About"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutComponent;