import React from 'react';
import './ProfilePage.scss';
import pencil from '../../assets/images/pencil.png';
import NewProfile from '../Profile/Profile.js';
import backgroundImage from '../../assets/images/profile-background3.jpg';

class ProfilePage extends React.Component {

    state = {
        newProfile : false,
    }

    newProfileRender = () => {
        if (this.state.newProfile) {
            return (
            <NewProfile />      
            )
        } else {
            return
        }
    }

    newProfileSwitch = () => {
        this.setState({
            newProfile : true
        })
    }

    profileRef = React.createRef();

    scrollToRef = () => {
        console.log(this.profileRef)
        window.scrollTo({
        left : 0, 
        top : this.profileRef.current.offsetTop,
        behavior: 'smooth'})     
    }

    componentDidUpdate() {
        if (this.state.newProfile) {
            this.scrollToRef()
        }
    }

    
    render() {
        return (
            <>
                <div className="profilePage">
                    <div className="profilePage__navigation" onClick={this.newProfileSwitch}>
                        <div className="profilePage__navigation-container">
                            <img className="profilePage__navigation-pencil" src={pencil} />
                            <div className="profilePage__label">NEW PROFILE</div>
                            <div className="profilePage__line profilePage__line--1"></div>
                        </div>
                    </div>
                    <img src={backgroundImage} className="profilePage__background" /> 
                </div>
                <div ref={this.profileRef}>
                    {this.newProfileRender()}
                </div>
                
            </>
        )
    }
}

export default ProfilePage;