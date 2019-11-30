import React from 'react';
import './Homepage.scss';
import Logo from '../../assets/logo/logo.png';
import Flower1 from '../../assets/images/flower1.png';
import Flower2 from '../../assets/images/flower4.png';
import Flower3 from '../../assets/images/flower5.png';
import { Link } from 'react-router-dom';

class Homepage extends React.Component {

    state = {
        hoverToggle : false
    }

    hoverRotate = () => {
        this.setState({
            hoverToggle : true
        })
    }

    flowerSelector = (number) => {
        if (number === 1) {
            return Flower1;
        } else if (number === 2) {
            return Flower2;
        } else if (number === 3) {
            return Flower3;
        }
    }

    gearRender = (number) => {
        if (this.state.hoverToggle) {
            if (number === 2) {
                return <img src={this.flowerSelector(number)} className={"homepage__link-icon--hover-counter homepage__link-icon homepage__link-icon--"+number} onMouseOver={this.hoverRotate} onMouseOut={this.hoverRotate}/>
            } else {
                return <img src={this.flowerSelector(number)} className={"homepage__link-icon--hover homepage__link-icon homepage__link-icon--"+number} onMouseOver={this.hoverRotate} onMouseOut={this.hoverRotate}/>    
            }
        } else {
            return <img src={this.flowerSelector(number)} className={"homepage__link-icon homepage__link-icon--"+number} onMouseOver={this.hoverRotate} onMouseOut={this.hoverRotate}/>
        }
    }

    render() {
        return(
            <div className="homepage">
                <div className="homepage__logo-container">
                    <img className="homepage__logo" src={Logo}></img>
                </div>
                <div className="homepage__navigation">
                    <Link to="/search">
                    <div className="homepage__link-container">
                        <div className="homepage__link-icon-container homepage__link-icon-container--1">
                            {this.gearRender(1)}
                        </div>
                        <div className="homepage__line homepage__line--1" />
                        <p className="homepage__link homepage__link--1" onMouseOver={this.hoverRotate} onMouseOut={this.hoverRotate}>SEARCH</p>
                    </div>
                    </Link>
                    <Link to="/profile">
                    <div className="homepage__link-container">
                        <div className="homepage__link-icon-container homepage__link-icon-container--2">
                            {this.gearRender(2)}
                        </div>
                        <div className="homepage__line homepage__line--2"></div>
                        <p className="homepage__link homepage__link--2" onMouseOver={this.hoverRotate} onMouseOut={this.hoverRotate}>PROFILE</p>
                    </div>
                    </ Link>
                    <Link to="/applications">
                    <div className="homepage__link-container">
                        <div className="homepage__link-icon-container homepage__link-icon-container--3">
                            {this.gearRender(3)}
                        </div>
                        <div className="homepage__line homepage__line--3" />
                        <p className="homepage__link homepage__link--3" onMouseOver={this.hoverRotate} onMouseOut={this.hoverRotate}>APPLICATIONS</p>
                    </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Homepage;