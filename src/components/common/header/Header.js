import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

class Header extends React.Component {

    state = {
        toggleDropDown: false,
    }

    toggleDropDown = (e) => {
        e.preventDefault();
        this.setState((state) => {
            return { toggleDropDown: !state.toggleDropDown };
        });
    }

    render() {
        return (
            <UserContext.Consumer>
                {
                    (value) => (
                        <nav className="menu fixed stackable">
                            <div className="container">
                                <NavLink to="/" className="menu-item keep" > games</NavLink>
                                <NavLink to="/about" className="menu-item keep" >about</NavLink>
                                <div className="dropdown menu-item keep right">
                                    <a href="#" onClick={this.toggleDropDown}>
                                        {value.profile.displayName}&nbsp;
                            <img srcSet={value.profile.photoURL} alt="" className="avatar" />
                                    </a>
                                    <div className="content bottom" style={this.state.toggleDropDown ? { display: "block" } : {}}>
                                        <ul>
                                            <li>
                                            <NavLink to="/collection" >collection</NavLink>
                                            </li>
                                            <li className="separator">
                                            </li>
                                            <li>
                                                 <a href="#" onClick={this.props.onLogout}>logout</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>)
                }
            </UserContext.Consumer>
        );
    }

}

export default Header;