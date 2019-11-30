import React from 'react';
import './JobComponent.scss';
import BackgroundImage from '../../assets/images/posting-image.jpg';

class JobComponent extends React.Component {

    state = {
        hover : false
    }

    onHoverShow = () => {
        this.setState({
            hover : true
        })
    }

    onHoverFinish = () => {
        this.setState({
            hover : false
        })
    }

    contentRender = () => {
        if (!this.state.hover) {
            return (
                <div className="posting__cover">
                    <div className="posting__cover-text">{this.props.companyName}</div>
                    <img className="posting__cover-background" src={this.props.image} />
                </div>
            )
        } else {
            return (
                <>
                    <div className="posting__content-container">
                        <div className="posting__rating-container">
                            <div className="posting__rating">{this.props.rating}</div>
                            <div className="posting__location">{this.props.city}</div> 
                            <div className="posting__post-date">{this.props.postedDateCount} <span className="posting__days-ago-text">days ago</span></div>
                        </div>
                        <div className="posting__title-details-container">
                            <div className="posting__title">{this.props.position}</div>
                            <div className="posting__details-container">
                                <div className="posting__company">{this.props.companyName}</div>                   
                                <div className="posting__category">| {this.props.category}</div>
                            </div>
                        </div>
                        <img className="posting__background" src={this.props.image} />
                    </div>
                </>
            )
        }
    }



    render() {
        return (
            <div className="posting" onMouseEnter={this.onHoverShow} onMouseLeave={this.onHoverFinish}>
                {this.contentRender()}
            </div>
        )
    }
}

export default JobComponent;