import React from 'react';
import './ProfilePage.scss';
import pencil from '../../assets/images/pencil.png';
import NewProfile from '../Profile/Profile.js';

class ProfilePage extends React.Component {

    state = {
        newProfile : false
    }

    newProfileRender = () => {
        if (this.state.newProfile) {
            return <NewProfile />
        } else {
            return
        }
    }

    newProfileSwitch = () => {
        let stateCopy = this.state;
        stateCopy.newProfile = true;

        this.setState({
            stateCopy
        })
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
                </div>
                {this.newProfileRender()}
            </>
        )
    }
}

export default ProfilePage;