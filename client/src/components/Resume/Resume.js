import React from 'react';
import './Resume.scss';
import Axios from 'axios';

class Resume extends React.Component {

    state = {
        profileId : null,
        jobPostingId : null,
        applicationId : this.props.match.params.id,
        profile : "",
        jobPosting : ""
    }

    getProfileByProfileId = () => {
        const url = "http://localhost:8080/";
        const path = "profiles/";
        const profileId = this.state.profileId;

        Axios.get(url+path+profileId)
            .then((res) => {
                let stateCopy = this.state;
                stateCopy.profile = res.data.userProfile;
           
                this.setState(
                    stateCopy
                )
                console.log(this.state);
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
                let stateCopy = this.state;
                stateCopy.profileId = res.data.profileId;
                stateCopy.jobPostingId = res.data.postingId;

                this.setState(
                    stateCopy
                )
            })
            .then((res) => {
                this.getProfileByProfileId();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount () {
        this.getProfileIdPostingIdByApplicationId();
    }

    resumeItemValidator = (item) => {
        if (item) {
            return item;
        } else {
            return "";
        }
    }

    expRespGenerator = (whichExp) => {
        let profileData = this.state.profile;
        let expOneArray = [this.resumeItemValidator(profileData.expResp1), this.resumeItemValidator(profileData.expResp2), this.resumeItemValidator(profileData.expResp3)];
        let expTwoArray = [this.resumeItemValidator(profileData.expRespT1), this.resumeItemValidator(profileData.expRespT2), this.resumeItemValidator(profileData.expRespT3)];

        if (whichExp === 1) {
            return expOneArray.map((value) => {
                if (value) {
                    return (
                        <li className="resume__resp-list-item">{value}</li>
                    )
                }
            })
        } else {
            return expTwoArray.map((value) => {
                if (value) {
                    return (
                        <li className="resume__resp-list-item">{value}</li>
                    )
                }
            })
        }        
    }

    awardGenerator = (whichAward) => {
        let profileData = this.state.profile;

        let awardArray1 = [
            this.resumeItemValidator(profileData.awardCert),
            this.resumeItemValidator(profileData.awardCertType),
            this.resumeItemValidator(profileData.awardCertYr)
        ]
        let awardArray2 = [
            this.resumeItemValidator(profileData.awardCert2),
            this.resumeItemValidator(profileData.awardCertType2),
            this.resumeItemValidator(profileData.awardCertYr2)
        ]

        if (whichAward === 1) {
            return (
                <div className="resume__award-yr-container">
                    <p className="resume__award">{awardArray1[0]} <span className="resume__award-type"> | {awardArray1[1]}</span></p>
                    <p className="resume__yr">{awardArray1[2]}</p>
                </div>
            )
        } else {
            return (
                <div className="resume__award-yr-container">
                    <p className="resume__award">{awardArray2[0]} <span className="resume__award-type"> | {awardArray2[1]}</span></p>
                    <p className="resume__yr">{awardArray2[2]}</p>
                </div>
            )
        }
    }

    render() {
        return(
            <>
                <div className="resume__container">
                    <div className="resume">
                        <div className="resume__header">
                            <h1 className="resume__userName">{this.state.profile.firstName} {this.state.profile.middleName} {this.state.profile.lastName}</h1>
                            <div className="resume__contact-container">
                                <p className="resume__contact-email">{this.state.profile.email}</p>
                                <p className="resume__contact-address">{this.state.profile.address}</p>
                                <p className="resume__contact-phone">{this.state.profile.telephone}</p>
                            </div>
                        </div>

                        <div className="resume__section">
                            <h2 className="resume__section-title">EXPERIENCE</h2>
                            <div className="resume__section-container">
                                <div className="resume__experience-container">
                                    <div className="resume__company-resp-container">
                                        <div className="resume__company">{this.state.profile.expOrg}</div>
                                        <ul className="resume__resp-list">
                                            {this.expRespGenerator(1)}
                                        </ul>
                                    </div>
                                    <div className="resume__role-year-container">
                                        <div className="resume__role">{this.state.profile.expRole}</div>
                                        <div className="resume__yr">{this.state.profile.expYr}</div>
                                    </div>
                                </div>
                                <div className="resume__experience-container">
                                    <div className="resume__company-resp-container">
                                        <div className="resume__company">{this.state.profile.expOrg2}</div>
                                        <ul className="resume__resp-list">
                                            {this.expRespGenerator(2)}
                                        </ul>
                                    </div>
                                    <div className="resume__role-year-container">
                                        <div className="resume__role">{this.state.profile.expRole2}</div>
                                        <div className="resume__yr">{this.state.profile.expYr2}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="resume__section">
                            <h2 className="resume__section-title">EDUCATION</h2>
                            <div className="resume__education-container">
                                <div className="resume__school-degree-container">
                                    <p className="resume__school">{this.state.profile.eduInstitution}</p>
                                    <div className="resume__degree">{this.state.profile.eduDegree}</div>
                                </div>
                                <div className="resume__education-degree-yr-container">
                                    <p className="resume__education-status">{this.state.profile.eduStatus}</p>
                                    <div className="resume__yr">{this.state.profile.eduYear}</div>
                                </div>    
                            </div>
                            
                            <div className="resume__education-container">
                                <div className="resume__school-degree-container">
                                    <p className="resume__school">{this.state.profile.eduInstitution2}</p>
                                    <div className="resume__degree">{this.state.profile.eduDegree2}</div>
                                </div>
                                <div className="resume__education-degree-yr-container">
                                    <p className="resume__education-status">{this.state.profile.eduStatus2}</p>
                                    <div className="resume__yr">{this.state.profile.eduYear}</div>
                                </div>    
                            </div> 
                        </div>

                        <div className="resume__section-divider">
                            <div className="resume__section resume__section--subsection">
                                <h2 className="resume__section-title">AWARDS &amp; CERTIFICATIONS</h2>
                                {this.awardGenerator(1)}
                                {this.awardGenerator(2)}
                            </div>

                            <div className="resume__section resume__section--subsection">
                                <h2 className="resume__section-title">SKILLS &amp; INTERESTS</h2>
                                <div className="resume__skills-container">
                                    <ul className="resume__skills-list">
                                        <li className="resume__skills-item">{this.state.profile.userSkills}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        )
    }
}

export default Resume;