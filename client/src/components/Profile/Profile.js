import React from 'react';
import './Profile.scss';
import newProfileBackground from '../../assets/images/profile-background.jpg';

class Profile extends React.Component {

    state = {
        responsibilityInputCount : ['input'],
        responsibilityInputCount2 : ['input'],
        responsibilityInputCount3 : ['input']
    }

    // This function determines how many inputs (experience -> responsibilities) to display
    // By default is 1 (based on state), but add button triggers an additional one
    addInputOnClick = (whichInputCount) => {
        if (whichInputCount === 1) {
            if (this.state.responsibilityInputCount.length < 4) {
                return (
                    this.state.responsibilityInputCount.map((input) => {
                        return <input className="profile__form-small-inputs" name="userExperienceResp" id="userExperienceResp"></input>
                    })
                )
            } else {
                alert("Too many inputs. Please refrain from including more than 3 responsibilities");
            }
        } else if (whichInputCount === 2) {

            if (this.state.responsibilityInputCount2.length < 4) {
                return (
                    this.state.responsibilityInputCount2.map((input) => {
                        return <input className="profile__form-small-inputs" name="userExperienceResp" id="userExperienceResp"></input>
                    })
                )
            } else {
                alert("Too many inputs. Please refrain from including more than 3 responsibilities");
            }
        } else {
            if (this.state.responsibilityInputCount3.length < 4) {
                return (
                    this.state.responsibilityInputCount3.map((input) => {
                        return <input className="profile__form-small-inputs" name="userExperienceResp" id="userExperienceResp"></input>
                    })
                )
            } else {
                alert("Too many inputs. Please refrain from including more than 3 responsibilities");
            }
        }
    }

    // This function adds an additional input to state, for the specific experience
    addInputClickHandler = (whichInputCount) => {
        let stateCopy = this.state;

        if (whichInputCount === 1) {
            stateCopy.responsibilityInputCount.push('input');
        } else if (whichInputCount === 2) {
            stateCopy.responsibilityInputCount2.push('input');
        } else {
            stateCopy.responsibilityInputCount3.push('input');
        }

        this.setState ({
            stateCopy
        })
    }

    render() {
        return (
            <>
            <div className="profile">
                <form className="profile__form" name="newProfileForm" id="newProfileForm">
                    <div className="profile__form-title-container">
                        <h1 className="profile__form-header">SUBMIT A NEW PROFILE</h1>
                        <p className="profile__form-description">Submitting a profile allows you to quickly apply to individual job postings with the click of a button!</p>
                    </div>
                    <div className="profile__form-main-container">
                        <div className="profile__form-userDetails">
                            <h2 className="profile__form-section-header">CONTACT</h2>
                            <div className="profile__form-userDetails-container">
                                <label className="profile__form-labels" htmlFor="firstName">FIRST NAME</label>
                                <input className="profile__form-small-inputs" id="firstName" name="firstName" />
                            </div>
                            <div className="profile__form-userDetails-container">
                                <label className="profile__form-labels" htmlFor="middleName">MIDDLE NAME</label>
                                <input className="profile__form-small-inputs" id="middleName" name="middleName" />
                            </div>
                            <div className="profile__form-userDetails-container">
                                <label className="profile__form-labels" htmlFor="lastName">LAST NAME</label>
                                <input className="profile__form-small-inputs" id="lastName" name="lastName" />
                            </div>
                            <div className="profile__form-userDetails-container">
                                <label className="profile__form-labels" htmlFor="userAddress">FULL ADDRESS</label>
                                <textarea className="profile__form-small-inputs profile__form-small-inputs--address" id="userAddress" name="userAddress" />
                            </div>
                            <div className="profile__form-userDetails-container">
                                <label className="profile__form-labels" htmlFor="userEmail">EMAIL</label>
                                <input className="profile__form-small-inputs" id="userEmail" name="userEmail" />
                            </div>
                            <div className="profile__form-userDetails-container">
                                <label className="profile__form-labels" htmlFor="userPhone">PHONE</label>
                                <input className="profile__form-small-inputs" id="userPhone" name="userPhone" />
                            </div>
                        </div>

                        <div className="profile__form-education">
                            <h2 className="profile__form-section-header">EDUCATION</h2>
                            <label className="profile__form-labels" htmlFor="userEducation">PRIMARY EDUCATION</label>
                            <label className="profile__form-labels" htmlFor="userEducationStatus"></label>
                            <select className="profile__form-selections" name="userEducationStatus" id="userEducationStatus">
                                <option value="In Progress">In progress</option>
                                <option value="Obtained">Obtained</option>
                            </select>
                            <textarea className="profile__form-small-inputs profile__form-small-inputs--address" name="userEducation" id="userEducation" />
                            <label className="profile__form-labels" htmlFor="userEducation2">ADDITIONAL EDUCATION</label>
                            <label className="profile__form-labels" htmlFor="userEducationStatus2"></label>
                            <select className="profile__form-selections" name="userEducationStatus2" id="userEducationStatus2">
                                <option value="In Progress">In progress</option>
                                <option value="Obtained">Obtained</option>
                            </select>
                            <textarea className="profile__form-small-inputs profile__form-small-inputs--address" name="userEducation2" id="userEducation2" />
                        </div>

                        <div className="profile__form-experience">
                            <h2 className="profile__form-section-header">EXPERIENCE</h2>

                            <label className="profile__form-labels" htmlFor="userExperience">EXPERIENCE # 1</label>
                            <input className="profile__form-small-inputs" name="userExperience" id="userExperience" />
                            <label className="profile__form-labels" htmlFor="userExperienceOrg">ORGANIZATION</label>
                            <input className="profile__form-small-inputs" name="userExperienceOrg" id="userExperienceOrg" />
                            <label className="profile__form-labels" htmlFor="userExperienceYear">YEARS WORKED</label>
                            <input className="profile__form-small-inputs" name="userExperienceYear" id="userExperienceYear" />
                            <label className="profile__form-labels" htmlFor="userExperienceResp">KEY RESPONSIBILITIES</label>
                            <button className="profile__form-add-button" type="button" onClick={() => {this.addInputClickHandler(1)}}>+</button>
                            {this.addInputOnClick(1)}

                            <label className="profile__form-labels" htmlFor="userExperience2">EXPERIENCE # 2</label>
                            <input className="profile__form-small-inputs" name="userExperience2" id="userExperience2" />
                            <label className="profile__form-labels" htmlFor="userExperienceOrg">ORGANIZATION</label>
                            <input className="profile__form-small-inputs" name="userExperienceOrg" id="userExperienceOrg" />
                            <label className="profile__form-labels" htmlFor="userExperienceYear2">YEARS WORKED</label>
                            <input className="profile__form-small-inputs" name="userExperienceYear2" id="userExperienceYear2" />
                            <label className="profile__form-labels" htmlFor="userExperienceResp2">KEY RESPONSIBILITIES</label>
                            <button className="profile__form-add-button" type="button" onClick={() => {this.addInputClickHandler(2)}}>+</button>
                            {this.addInputOnClick(2)}

                            <label className="profile__form-labels" htmlFor="userExperience3">EXPERIENCE # 3</label>
                            <input className="profile__form-small-inputs" name="userExperience3" id="userExperience" />
                            <label className="profile__form-labels" htmlFor="userExperienceOrg">ORGANIZATION</label>
                            <input className="profile__form-small-inputs" name="userExperienceOrg" id="userExperienceOrg" />
                            <label className="profile__form-labels" htmlFor="userExperienceYear3">YEARS WORKED</label>
                            <input className="profile__form-small-inputs" name="userExperienceYear3" id="userExperienceYear" />
                            <label className="profile__form-labels" htmlFor="userExperienceResp3">KEY RESPONSIBILITIES</label>
                            <button className="profile__form-add-button" type="button" onClick={() => {this.addInputClickHandler(3)}}>+</button>
                            {this.addInputOnClick(3)}
                        </div>

                        <div className="profile__form-awards-certifications">
                            <h2 className="profile__form-section-header">AWARDS AND/OR CERTIFICATIONS</h2>

                            <select name="userAwardCertType" id="userAwardCertType">
                                <option value="Award">Award</option>
                                <option value="Certification">Certification</option>
                            </select>
                            <input name="userAwardCert" />
                            <label htmlFor="userAwardCertYr">Year</label>
                            <input name="userAwardCertYr" id="userAwardCertYr" />

                            <select name="userAwardCertType2" id="userAwardCertType2">
                                <option value="Award">Award</option>
                                <option value="Certification">Certification</option>
                            </select>
                            <input name="userAwardCert2" />
                            <label htmlFor="userAwardCertYr2">Year</label>
                            <input name="userAwardCertYr2" id="userAwardCertYr2" />
                        </div>

                        <div className="profile__form-skills">
                            <h2 className="profile__form-section-header">SKILLS AND/OR INTERESTS</h2>
                            <input name="userSkills" id="userSkills"></input>
                        </div> 

                        <div className="profile__form-coverLetter">
                            <h2 className="profile__form-section-header">COVER LETTER</h2>
                            <p>This section contains the main contents of your cover letter. Include only the body.</p>
                            <textarea name="userCoverLetter" id="userCoverLetter" />
                        </div>
                    </div> 
                </form>
                <img className="profile__background" src={newProfileBackground} />
            </div>
            
            </>
        )
    }
}

export default Profile;