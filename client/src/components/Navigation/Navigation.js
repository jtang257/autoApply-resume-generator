import React from 'react';
import './Navigation.scss';
import { bubble as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import navigationMenu from '../../assets/icons/menu-icon.svg';
import logo from '../../assets/logo/logo.png';

class Navigation extends React.Component {

    state = {
        navMenuToggle : false
    }

    handleStateChange = (state) => {
        this.setState({
            navMenuToggle : state.isOpen
        })
    }

    navBarTrigger = () => {
        this.setState({
            navMenuToggle : !this.state.navMenuToggle
        })
    }

    navRender = () => {
        if (this.state.navMenuToggle) {
            return (
                <Menu isOpen={this.state.navMenuToggle} onStateChange={(state) => this.handleStateChange(state)}>
                    <img src={logo} className="nav-logo" />
                    <Link to="/" id="home" className="menu-item" onClick={this.navBarTrigger}>HOME</Link>
                    <Link to="/search" id="search" className="menu-item" onClick={this.navBarTrigger}>SEARCH</Link>
                    <Link to="/profile" id="profile" className="menu-item" onClick={this.navBarTrigger}>PROFILE</Link>
                    <Link to="/applications" id="applications" className="menu-item" onClick={this.navBarTrigger}>APPLICATIONS</Link>
                </Menu>
            )
        }
    }

    render() {
        return(
            <>
                <img className="navigation__icon" src={navigationMenu} onClick={this.navBarTrigger} />
                {this.navRender()}
            </>
        )
    }
}

export default Navigation;