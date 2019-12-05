import React from 'react';
import './Profile.scss';
import newProfileBackground from '../../assets/images/new-profile-background.jpg';
import Axios from 'axios';

class Profile extends React.Component {

    state = {
        responsibilityInputCount : [1],
        responsibilityInputCount2 : [1],
    }

    // This function determines how many inputs to display, and works with addInputClickHandler
    // By default displays 1 but add ("+") button triggers an additional one which is facilitated by addInputClickHandler
    // which sets state to add an additional value to the array. The outputted input element includes slight tweaks
    // to its name/id based on which input element it is, within the group. This allows for easier reference to each
    // element when the form is submitted, in function formSubmission 
 
    addInputOnClick = (whichInputCount) => {

        if (whichInputCount === 1) {
            if (this.state.responsibilityInputCount.length < 4) {
                return (
                    this.state.responsibilityInputCount.map((input) => {
                        let count = this.state.responsibilityInputCount[input-1]
                        return <input className="profile__form-small-inputs" name={`userExperienceResp${count}`} id={`userExperienceResp${count}`}></input>
                    })
                )
            } else {
                alert("Too many inputs. Please refrain from including more than 3 responsibilities");
            }
        } else if (whichInputCount === 2) {

            if (this.state.responsibilityInputCount2.length < 4) {
                return (
                    this.state.responsibilityInputCount2.map((input) => {
                        let count = this.state.responsibilityInputCount2[input-1]
                        return <input className="profile__form-small-inputs" name={`userExperienceRespT${count}`} id={`userExperienceRespT${count}`}></input>
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
        let currentCount1 = this.state.responsibilityInputCount.length;
        let currentCount2 = this.state.responsibilityInputCount2.length;

        if (whichInputCount === 1) {
            stateCopy.responsibilityInputCount.push(currentCount1+1);
        } else if (whichInputCount === 2) {
            stateCopy.responsibilityInputCount2.push(currentCount2+1);
        }

        this.setState (
            stateCopy
        )
    }

    // this function is an Axios POST request, and is responsible for submitting the user's profile to the server

    profilePost = (userProfile) => {
        const url = "http://localhost:8080/";
        const path = "profiles";

        Axios.post(url+path, {
            userProfile
        })
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err);
        })    
    }

    // this function validates if a an input field exists

    doesValueExist = (value) => {
        if (value) {
            return value.value;
        } else {
            return "";
        }
    }

    // onSubmit, this function submits a post request using the user's submitted information

    formSubmission = (e) => {
        e.preventDefault();
        
        let newProfile = {
            profileName : e.target.profileName.value,
            firstName : e.target.firstName.value,
            middleName : e.target.middleName.value,
            lastName : e.target.lastName.value,
            address : e.target.userAddress.value,
            email : e.target.userEmail.value,
            telephone : e.target.userPhone.value,
            eduInstitution : e.target.userEducationInstitution.value,
            eduStatus : e.target.userEducationStatus.value,
            eduDegree : e.target.userEducation.value,
            eduYear : e.target.userEducationYr1.value,
            eduInstitution2 : e.target.userEducationInstitution2.value,
            eduStatus2 : e.target.userEducationStatus2.value,
            eduDegree2 : e.target.userEducation2.value,
            eduYear2 : e.target.userEducationYr2.value,
            expRole : e.target.userExperience.value,
            expOrg : e.target.userExperienceOrg.value,
            expYr : e.target.userExperienceYear.value,
            expResp1 : e.target.userExperienceResp1.value,
            expResp2 : this.doesValueExist(e.target.userExperienceResp2),
            expResp3 : this.doesValueExist(e.target.userExperienceResp3),
            expRole2 : e.target.userExperience2.value,
            expOrg2 : e.target.userExperienceOrg2.value,
            expYr2 : e.target.userExperienceYear2.value,
            expRespT1 : e.target.userExperienceRespT1.value,
            expRespT2 : this.doesValueExist(e.target.userExperienceRespT2),
            expRespT3 : this.doesValueExist(e.target.userExperienceRespT3),
            awardCert : e.target.userAwardCert.value,
            awardCertType : e.target.userAwardCertType.value,
            awardCertYr : e.target.userAwardCertYr.value,
            awardCert2 : e.target.userAwardCert2.value,
            awardCertType2 : e.target.userAwardCertType2.value,
            awardCertYr2 : e.target.userAwardCertYr2.value,
            userSkills : e.target.userSkills.value,
            coverLetter : e.target.userCoverLetter.value
        }

        this.profilePost(newProfile);
    }

    render() {
        return (
            <>
            <div className="profile">
                <form className="profile__form" name="newProfileForm" id="newProfileForm" onSubmit={(e) => {this.formSubmission(e)}}>
                    <div className="profile__form-title-container">
                        <h1 className="profile__form-header">SUBMIT A NEW PROFILE</h1>
                        <p className="profile__form-header-description">Submitting a profile allows you to quickly apply to individual job postings with the click of a button!</p>
                        <div className="profile__form-button-container">
                            <button className="profile__form-button" type="submit">SUBMIT</button>
                            <button className="profile__form-button profile__form-button--reset" type="reset">CLEAR</button>
                        </div>
                    </div>

                    {/* Form begins */}

                    {/* Contact Section */}

                    <div className="profile__form-main-container">
                        <div className="profile__form-userDetails">
                            <h2 className="profile__form-section-header">CONTACT</h2>
                            <div className="profile__form-userDetails-container">
                                <label className="profile__form-labels" htmlFor="firstName">PROFILE NAME</label>
                                <input className="profile__form-small-inputs" id="profileName" name="profileName" />
                            </div>
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

                        {/* EDUCATION SECTION */}

                        <div className="profile__form-education">
                            <h2 className="profile__form-section-header">EDUCATION</h2>
                            <label className="profile__form-labels" htmlFor="userEducation">PRIMARY EDUCATION</label>
                            <label className="profile__form-labels" htmlFor="userEducationInstitution">INSTITUTION</label>
                            <input className="profile__form-small-inputs" name="userEducationInstitution" id="userEducationInstitution" />
                            <select className="profile__form-selections" name="userEducationStatus" id="userEducationStatus">
                                <option value="In Progress">In progress</option>
                                <option value="Obtained">Obtained</option>
                            </select>
                            <textarea className="profile__form-small-inputs profile__form-small-inputs--address" name="userEducation" id="userEducation" />
                            <label className="profile__form-labels" htmlFor="userEducationYr1">YEAR</label>
                            <input className="profile__form-small-inputs" name="userEducationYr1" id="userEducationYr1" />

                            <label className="profile__form-labels" htmlFor="userEducation2">ADDITIONAL EDUCATION</label>
                            <label className="profile__form-labels" htmlFor="userEducationInstitution2">INSTITUTION</label>
                            <input className="profile__form-small-inputs" name="userEducationInstitution2" id="userEducationInstitution2" />
                            <select className="profile__form-selections" name="userEducationStatus2" id="userEducationStatus2">
                                <option value="In Progress">In progress</option>
                                <option value="Obtained">Obtained</option>
                            </select>
                            <textarea className="profile__form-small-inputs profile__form-small-inputs--address" name="userEducation2" id="userEducation2" />
                            <label className="profile__form-labels" htmlFor="userEducationYr2">YEAR</label>
                            <input className="profile__form-small-inputs" name="userEducationYr2" id="userEducationYr2" />
                        </div>

                        {/* EXPERIENCE SECTION */}

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
                            <label className="profile__form-labels" htmlFor="userExperienceOrg2">ORGANIZATION</label>
                            <input className="profile__form-small-inputs" name="userExperienceOrg2" id="userExperienceOrg2" />
                            <label className="profile__form-labels" htmlFor="userExperienceYear2">YEARS WORKED</label>
                            <input className="profile__form-small-inputs" name="userExperienceYear2" id="userExperienceYear2" />
                            <label className="profile__form-labels" htmlFor="userExperienceResp2">KEY RESPONSIBILITIES</label>
                            <button className="profile__form-add-button" type="button" onClick={() => {this.addInputClickHandler(2)}}>+</button>
                            {this.addInputOnClick(2)}
                        </div>

                        {/* AWARDS / CERTIFICATIONS SECTION */}

                        <div className="profile__form-awards-certifications">
                            <h2 className="profile__form-section-header">AWARDS &amp; CERTIFICATIONS</h2>

                            <label className="profile__form-labels" htmlFor="userAwardCertType">AWARDS &amp; CERTIFICATIONS</label>
                            <input className="profile__form-small-inputs" name="userAwardCert" />
                            <select className="profile__form-selections" name="userAwardCertType" id="userAwardCertType">
                                <option value="Award">Award</option>
                                <option value="Certification">Certification</option>
                            </select>
                            <label className="profile__form-labels" htmlFor="userAwardCertYr">YEAR</label>
                            <input className="profile__form-small-inputs" name="userAwardCertYr" id="userAwardCertYr" />

                            <label className="profile__form-labels" htmlFor="userAwardCertType2">AWARDS &amp; CERTIFICATIONS</label>
                            <input className="profile__form-small-inputs" name="userAwardCert2" />
                            <select className="profile__form-selections" name="userAwardCertType2" id="userAwardCertType2">
                                <option value="Award">Award</option>
                                <option value="Certification">Certification</option>
                            </select>
                            <label className="profile__form-labels" htmlFor="userAwardCertYr2">YEAR</label>
                            <input className="profile__form-small-inputs" name="userAwardCertYr2" id="userAwardCertYr2" />
                        </div>

                        {/* SKILLS SECTION */}

                        <div className="profile__form-skills">
                            <h2 className="profile__form-section-header">SKILLS &amp; INTERESTS</h2>
                            <label className="profile__form-labels" htmlFor="userSkills">SKILLS &amp; INTERESTS</label>
                            <input className="profile__form-small-inputs" name="userSkills" id="userSkills"></input>
                        </div> 
                        
                        {/* COVER LETTER SECTION */}

                        <div className="profile__form-coverLetter">
                            <h2 className="profile__form-section-header">COVER LETTER</h2>
                            <p className="profile__form-description">This section contains the main contents of your cover letter. Include only the body.</p>
                            <textarea className="profile__form-coverLetterInput" name="userCoverLetter" id="userCoverLetter" />
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