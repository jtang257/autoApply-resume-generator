import React from 'react';
import './JobComponent.scss';
import ReactModal from 'react-modal';
import '../JobModal/JobModal.scss';
import modalBackground from '../../assets/images/posting-modal-background2.jpg';


class JobComponent extends React.Component {

    state = {
        hover : false,
        modal : false
    }

    onHoverShow = () => {
        let stateCopy = this.state;
        stateCopy.hover = true;

        this.setState({
            stateCopy
        })
    }

    onHoverFinish = () => {
        let stateCopy = this.state;
        stateCopy.hover = false;

        this.setState({
            stateCopy
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

    modalOpen = (e) => {
        e.preventDefault();
        console.log(this.props)
        
        let stateCopy = this.state;
        stateCopy.modal = true;

        this.setState({
            stateCopy
        })
    }

    modalClose = (e) => {
        e.preventDefault();

        let stateCopy = this.state;
        stateCopy.modal = false;

        this.setState({
            stateCopy
        })
    }

    urgentHiringConverter = () => {
        if (this.props.urgency) {
            return "Yes"
        } else {
            return "No"
        }
    }

    requirementsConverter = () => {
        let resumeReq = this.props.resumeRequired;
        let coverLetterReq = this.props.coverLetterRequired;

        if (resumeReq && coverLetterReq) {
            return "Resume & Cover Letter"
        } else if (resumeReq) {
            return "Resume Only"
        } else if (coverLetterReq) {
            return "Cover Letter Only"
        } else {
            return "N/A"
        }
    }


    render() {
        return (
            <>
                <div className="posting" onMouseEnter={this.onHoverShow} onMouseLeave={this.onHoverFinish} onClick={(e) => {this.modalOpen(e)}}>
                    {this.contentRender()}
                </div>
                <ReactModal
                        isOpen={this.state.modal}
                        onRequestClose={(e) => {this.modalClose(e)}}
                        ariaHideApp={false}
                        className="modal__container"
                        overlayClassName="modal__overlay"
                        shouldCloseOnOverlayClick={true}
                    >
                        <form className="modal__form-container" onSubmit={null}>
                            <div className="modal__form-layout">
                                <div className="modal__header">
                                    <div className="modal__rating">{this.props.rating}</div>
                                    <h1 className="modal__position">{this.props.position}</h1>
                                </div>
                                <div className="modal__company-container">
                                    <label className="modal__label">COMPANY</label>
                                    <p className="modal__content">{this.props.companyName}</p>
                                </div>
                                <div className="modal__location-container">
                                    <label className="modal__label">LOCATION</label>
                                    <p className="modal__content">{this.props.city} {this.props.province}, {this.props.country}</p>
                                </div>
                                <div className="modal__urgency-container">
                                    <label className="modal__label">URGENTLY HIRING</label>
                                    <p className="modal__content">{this.urgentHiringConverter()}</p>
                                </div>
                                <div className="modal__requirements-container">
                                    <label className="modal__label">REQUIREMENTS</label>
                                    <p className="modal__content">{this.requirementsConverter()}</p>
                                </div>
                                <div className="modal__posted-container">
                                    <label className="modal__label">POSTED</label>
                                    <p className="modal__content">{this.props.postedDateCount} days ago</p>
                                </div>
                                <div className="modal__pay-container">
                                    <label className="modal__label">PAY</label>
                                    <p className="modal__content">{this.props.pay}</p>
                                </div>
                                <div className="modal__postedDate-container">
                                    <label className="modal__label">ORIGINAL POSTING</label>
                                    <a className="modal__content" src={this.props.url}>Indeed</a>
                                </div>
                            </div>
                            <div className="modal__buttons-container">
                                <div className="modal__select-container">
                                    <label className="modal__label" htmlFor="profileSelect">SELECT PROFILE</label>
                                    <select className="modal__select" name="profileSelect" id="profileSelect">
                                        <option value="Profile ID">Profile ID</option>
                                        <option value="Profile ID">Profile ID</option> 
                                    </select>
                                </div>
                                <div className="modal__guide"></div>
                                <div className="modal__generate-container">
                                    <button className="modal__button">GENERATE RESUME</button>
                                    <button className="modal__button">GENERATE COVER LETTER</button>
                                </div>
                                <div className="modal__guide"></div>
                                <div className="modal__cancel-container">
                                    <button className="modal__button modal__button--close" onClick={(e) => {this.modalClose(e)}}>X</button>
                                </div>
                            </div>
                            <img className="modal__background" src={modalBackground} />
                        </form>
                </ReactModal>
            </>
        )
    }
}

export default JobComponent;