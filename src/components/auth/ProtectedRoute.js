import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../common/header/Header';
import { UserContext } from '../../context/UserContext';

class ProtectedRoute extends React.Component {

    static contextType = UserContext;

    render() {
        const { component: Component,location,onLogout, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props => {
                    if (this.context.authenticated) {
                        console.info("props",props);
                        return (
                            <>
                                <Header onLogout={onLogout}/>
                                <div className="spacer"></div>
                                <div className="spacer tiny"></div>
                                <Component {...props} {...rest} />
                            </>
                        )
                    } else {
                        return <Redirect to={{
                            pathname: "/login",
                            state: { from: location }
                        }} />
                    }
                }}
            />
        );
    }
}

export default ProtectedRoute;