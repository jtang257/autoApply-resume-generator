import React from 'react';
import './JobComponent.scss';
import BackgroundImage from '../../assets/images/posting-image.jpg';

class JobComponent extends React.Component {

    state = {
        hover : false
    }

    onHoverShow = () => {
        this.setState({
            hover : !this.state.hover
        })
    }

    contentRender = () => {
        if (!this.state.hover) {
            return (
                <div className="posting__cover">
                    <div className="posting__cover-text">{this.props.companyName}</div>
                    <img className="posting__cover-background" src={BackgroundImage} />
                </div>
            )
        } else {
            return (
                <>
                    <div className="posting__content-container">
                        <div className="posting__rating-container">
                            <div className="posting__rating">{this.props.rating}</div>
                        </div>
                        <div className="posting__title-details-container">
                            <div className="posting__title">{this.props.position}</div>
                            <div className="posting__details-container">
                                <div className="posting__company">{this.props.companyName}</div>
                                <div className="posting__location">{this.props.city}, {this.props.province}</div>                    
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }



    render() {
        return (
            <div className="posting" onMouseOver={this.onHoverShow} onMouseOut={this.onHoverShow}>
                {this.contentRender()}
            </div>
        )
    }
}

export default JobComponent;