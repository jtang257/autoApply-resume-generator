import React from 'react';
import './CoverLetter.scss';
import Axios from 'axios';
import moment from 'moment';
import ReactToPdf from 'react-to-pdf';

class CoverLetter extends React.Component {

    state = {
        profileId : null,
        jobPostingId : null,
        applicationId : this.props.match.params.id,
        profile : "",
        jobPosting : "",
        ref : React.createRef(),
        pdfOptions : {
            unit : 'in',
            orientation: 'p',
            format: 'letter'

        }
    }


    getPostingByPostingId = () => {
        const url = "http://localhost:8080/";
        const path = "search/";
        const profileId = this.state.jobPostingId;

        Axios.get(url+path+profileId)
            .then((res) => {
                let stateCopy = Object.assign({}, this.state);
                stateCopy.jobPosting = res.data;

                this.setState(
                    stateCopy
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getProfileByProfileId = () => {
        const url = "http://localhost:8080/";
        const path = "profiles/";
        const profileId = this.state.profileId;

        Axios.get(url+path+profileId)
            .then((res) => {
                let stateCopy = Object.assign({}, this.state);
                stateCopy.profile = res.data.userProfile;
           
                this.setState(
                    stateCopy
                )
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getProfileIdPostingIdByApplicationId = () => {
        const url = "http://localhost:8080/";
        const path = "applications/";
        const applicationId = this.state.applicationId;
        
        Axios.get(url+path+applicationId)
            .then((res) => {
                let stateCopy = Object.assign({}, this.state);
                stateCopy.profileId = res.data.profileId;
                stateCopy.jobPostingId = res.data.postingId;

                this.setState(
                    stateCopy
                )
            })
            .then((res) => {
                this.getProfileByProfileId();
                this.getPostingByPostingId();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount () {
        this.getProfileIdPostingIdByApplicationId();
    }

    dateFunction () {
        let dateNow = new Date ();
        let formattedDate = moment(dateNow).format('MM/DD/YYYY')

        return formattedDate;
    }

    render() {
        return(
            <div className="cl__container">
                <ReactToPdf targetRef={this.state.ref} x={-0.2} y={0} options={this.state.pdfOptions} filename="coverLetter.pdf">
                    {({toPdf}) => (
                        <button className="cl__pdf-generator" onClick={toPdf}>Generate PDF</button>
                    )}
                </ReactToPdf>
                <div className="cl" ref={this.state.ref}>
                    <div className="cl__header">
                        <h1 className="cl__header-name">{this.state.profile.firstName} {this.state.profile.middleName} {this.state.profile.lastName}</h1>
                        <div className="cl__header-title">{this.state.profile.expRole}</div>
                    </div>
                    <div className="cl__divider">
                        <div className="cl__main">
                            <div className="cl__date-container">
                                <p className="cl__date">{this.dateFunction()}</p>
                            </div>
                            <div className="cl__posting-contact">
                                <span className="cl__posting-contact-details">Hiring Manager</span>
                                <span className="cl__posting-contact-details">25 York St</span>
                                <span className="cl__posting-contact-details">{this.state.jobPosting.city} {this.state.jobPosting.province}, {this.state.jobPosting.country}</span>
                            </div>
                            <div className="cl__main-body">
                                <span className="cl__posting-contact-details">Re: {this.state.jobPosting.position}</span>
                                <p className="cl__main-wrapper">Dear Hiring Manager,</p>
                                <p className="cl__main-paragraph">
                                    My name is {this.state.profile.firstName} and i'm please to be applying for the position of {this.state.jobPosting.position} at {this.state.jobPosting.companyName}. 
                                    I was ecstatic to find this opening at autoApply, and feel that my background at {this.state.profile.expOrg} as a
                                    {this.state.profile.expRole} and education at {this.state.profile.eduInstitution} make me a unique fit for this role.
                                </p>
                                <p className="cl__main-paragraph">
                                    Some highlights from my previous experience include:
                                </p>
                                <ul className="cl__main-list">
                                    <li className="cl__main-list-item">{this.state.profile.expResp1}</li>
                                    <li className="cl__main-list-item">{this.state.profile.expRespT1}</li>
                                    <li className="cl__main-list-item">My {this.state.profile.eduDegree} at {this.state.profile.eduInstitution}</li>
                                </ul>
                                <p className="cl__main-paragraph">
                                    {this.state.profile.coverLetter}
                                </p>
                                <p className="cl__main-paragraph">
                                    Enclosed is my resume, which further details my education and past experiences. I look forward to the opportunity
                                    to discuss my application at your earliest convenience. Please reach me by email at {this.state.profile.email} or by telephone  
                                    at {this.state.profile.telephone}. Thank you for your time, and I look forward to hearing from you soon.
                                </p>
                                <span className="cl__main-wrapper">Sincerely,</span>
                                <p className="cl__main-signoff">{this.state.profile.firstName} {this.state.profile.middleName} {this.state.profile.lastName}</p>
                            </div>
                        </div>
                        <div className="cl__aside">
                            <h2 className="cl__aside-header">Contact Info</h2>
                            <div className="cl__contact">
                                <div className="cl__contact-container">
                                    <label className="cl__contact-label">Phone</label>
                                    <p className="cl__contact-info">{this.state.profile.telephone}</p>
                                </div>
                                <div className="cl__contact-container">
                                    <label className="cl__contact-label">Email</label>
                                    <p className="cl__contact-info">{this.state.profile.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CoverLetter;