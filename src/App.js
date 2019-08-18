import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import GamesContainer from './components/games/GamesContainer';
import AboutComponent from './components/about/AboutComponent';
import NotFoundComponent from './components/common/notfound/NotFoundComponent';
import GameFormContainer from './components/games/gameForm/GameFormContainer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { auth, provider } from "./firebase/firebaseInitializer";
import AuthComponent from "./components/auth/AuthComponent";
import { UserContext } from './context/UserContext';
import GamesOwnerContainer from './components/games/GamesOwnerContainer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      user: { 
        authenticated: false, 
        profile: null, 
        userToken: ''
      }
    };
  }

  componentDidMount() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const access_token_parsed = JSON.parse(`${access_token}`);
      this.setState({
        user: {
          ...access_token_parsed
        }
      });
    }
  }

  onLogin = (path = "/") => {
    auth.signInWithPopup(provider)
      .then(async (result) => {
        const profile = result.user;
        let userToken = await profile.getIdToken()

        localStorage.setItem("access_token", JSON.stringify({
          authenticated: true,
          profile,
          userToken
        }));

        this.setState({
          user: {
            authenticated: true,
            profile,
            userToken
          }
        });

      });
  }

  onLogout = () => {
    auth.signOut()
      .then(() => {
        localStorage.removeItem("access_token");
        this.setState({
          user: {
            authenticated: false,
            profile: null,
            userToken: null
          }
        });
      });
  }

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        <Switch>
          <ProtectedRoute onLogout={this.onLogout} path='/' component={GamesContainer} exact />
          <ProtectedRoute onLogout={this.onLogout} path='/new' component={GameFormContainer} />
          <ProtectedRoute onLogout={this.onLogout} path='/edit/:id' component={GameFormContainer} />
          <ProtectedRoute onLogout={this.onLogout} path='/about' component={AboutComponent} />
          <ProtectedRoute onLogout={this.onLogout} path='/collection' component={GamesOwnerContainer} user={this.state.user}/>
          <Route path='/login' render={(props) => <AuthComponent onLogin={this.onLogin} />} />
          <Route path='' component={NotFoundComponent} />
        </Switch>
      </UserContext.Provider>
    );
  }
}

export default App;
