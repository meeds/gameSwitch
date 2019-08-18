import React from 'react';
import { Redirect } from 'react-router-dom';
import "./AuthComponent.css";
import { UserContext } from '../../context/UserContext';
import WelcomeComponent from '../common/welcome/WelcomeComponent';

class AuthComponent extends React.Component {

  static contextType = UserContext;

  render() {
    const {  authenticated  } = this.context;
    return (
      authenticated ? (<Redirect to="/" />) :
        (
          <div className="login-container">
            <div className="login-row">
              <div className="segment">
                <WelcomeComponent title="Welcome to Game Switch"/>
                <button className="button" onClick={this.props.onLogin}>Connect with Google Account</button>
              </div>
            </div>
          </div>
        )
    );
  }
}

export default AuthComponent;