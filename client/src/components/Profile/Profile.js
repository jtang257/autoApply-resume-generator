import React from 'react';
import './Profile.scss';
import newProfileBackground from '../../assets/images/new-profile-background2.jpg';
import Axios from 'axios';
import ScrollContainer from 'react-indiana-drag-scroll';

class Profile extends React.Component {

    state = {
        responsibilityInputCount : [1],
        responsibilityInputCount2 : [1],
        characterCount : {
            userDetails : 0,
            education : 0,
            experience: 0,
            awards: 0,
            skills: 0,
            coverLetter: 0
        },

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
                        return <input className="profile__form-small-inputs" name={`userExperienceResp${count}`} id={`userExperienceResp${count}`} defaultValue="Main photographer in charge of capturing the friendly neighbourhood spiderman, in action, in the neighbourhood of Queens, NYC, resulting in a total picture count of 253" required></input>
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
                        return <input className="profile__form-small-inputs" name={`userExperienceRespT${count}`} id={`userExperienceRespT${count}`} defaultValue="Main aide to Iron Man, Captain America, Thor, The Incredible Hulk, Black Widow, Hawkeye, Wonder Woman, Vision, amongst other notable Superheroes" required></input>
                    })
                )
            } else {
                alert("Too many inputs. Please refrain from including more than 3 responsibilities");
            }
        } 
    }

    // This function adds an additional input to state, for the specific experience
    addInputClickHandler = (whichInputCount) => {
        let stateCopy = Object.assign({}, this.state)
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
        e.target.reset();
        alert("Form has been submitted!")
    }

    backspaceKeyCheck = (key) => {
        if (key === 'Backspace') {
            return 1;
        } else {
            return 0;
        }
    }

    keyCheck = (key) => {
        if (key === 'Backspace') {
            return 0;
        } else if (key ==='Shift') {
            return 0;
        } else {
            return 1;
        }
    }

    countCharactersOnKeyClick = (e, whichSection) => {
        let inputDecrement = this.backspaceKeyCheck(e.key);
        let inputIncrement = this.keyCheck(e.key);
        let inputLength = e.target.value.length+inputIncrement;
        
        if (whichSection === "coverLetter") {
            let stateCopy = Object.assign({}, this.state)
            if (inputLength > 0) {
                stateCopy.characterCount.coverLetter = stateCopy.characterCount.coverLetter+inputIncrement-inputDecrement;
                
                this.setState({
                    stateCopy
                }) 
            } 
        } else if (whichSection === "education") {
            let stateCopy = Object.assign({}, this.state);
            if (inputLength > 0) {
                stateCopy.characterCount.education = stateCopy.characterCount.education+inputIncrement-inputDecrement;
                
                this.setState(
                    stateCopy
                ) 
            } 
        } else if (whichSection === "experience") {
            let stateCopy = Object.assign({}, this.state);
            if (inputLength > 0) {
                stateCopy.characterCount.experience = stateCopy.characterCount.experience+inputIncrement-inputDecrement;
                
                this.setState(
                    stateCopy
                ) 
            }
        } if (whichSection === "awards") {
            let stateCopy = Object.assign({}, this.state);
            if (inputLength > 0) {
                stateCopy.characterCount.awards = stateCopy.characterCount.awards+inputIncrement-inputDecrement;
                
                this.setState(
                    stateCopy
                ) 
            }
        } else if (whichSection === "skills") {
            let stateCopy = Object.assign({}, this.state);
            if (inputLength > 0) {
                stateCopy.characterCount.skills = stateCopy.characterCount.skills+inputIncrement-inputDecrement;
                
                this.setState(
                    stateCopy
                ) 
            }
        } else if (whichSection === "userDetails") {
            let stateCopy = Object.assign({}, this.state);
            if (inputLength > 0) {
                stateCopy.characterCount.userDetails = stateCopy.characterCount.userDetails+inputIncrement-inputDecrement;
                
                this.setState(
                    stateCopy
                ) 
            }
        }
    }


    
    render() {
        return (
            <>
            
            <div className="profile">
                <form className="profile__form" id="newProfileForm" onSubmit={(e) => {this.formSubmission(e)}}>
                    <div className="profile__form-title-container">
                        <h1 className="profile__form-header">SUBMIT A NEW PROFILE</h1>
                        <div className="profile__form-button-container">
                            <button className="profile__form-button" type="submit" onClick={this.clearFormOnSubmit}>SUBMIT</button>
                            <button className="profile__form-button profile__form-button--reset" type="reset">CLEAR</button>
                        </div>
                    </div>


                    {/* Form begins */}

                    {/* Contact Section */}
                        {/* ScrollContainer is the main container for the scrollable elements (use to be a div) */}
                        
                        <ScrollContainer className="profile__form-main-container" horizontal={true} hideScrollbars={true} ignoreElements={"input, textarea, select, button"}>
                            <div className="profile__form-userDetails">
                                <h2 className="profile__form-section-header">CONTACT</h2>
                                <div className="profile__form-divider--row">
                                    <div className="profile__form-userDetails-container">
                                        <label className="profile__form-labels" htmlFor="firstName">PROFILE NAME</label>
                                        <input className="profile__form-small-inputs"  id="profileName" name="profileName" defaultValue="Peter Parker's Profile" required />
                                    </div>
                                    <div className="profile__form-userDetails-container">
                                        <label className="profile__form-labels" htmlFor="firstName">FIRST NAME</label>
                                        <input className="profile__form-small-inputs" id="firstName" name="firstName" defaultValue="Peter" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "userDetails")}} required />
                                    </div>
                                </div>
                                <div className="profile__form-divider--row">
                                    <div className="profile__form-userDetails-container">
                                        <label className="profile__form-labels" htmlFor="middleName">MIDDLE NAME</label>
                                        <input className="profile__form-small-inputs" id="middleName" name="middleName" defaultValue="Benjamin" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "userDetails")}}/>
                                    </div>
                                    <div className="profile__form-userDetails-container">
                                        <label className="profile__form-labels" htmlFor="lastName">LAST NAME</label>
                                        <input className="profile__form-small-inputs" id="lastName" name="lastName" defaultValue="Parker" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "userDetails")}} required />
                                    </div>
                                </div>
                                <div className="profile__form-divider--row">
                                    <div className="profile__form-userDetails-container">
                                        <label className="profile__form-labels" htmlFor="userPhone">PHONE</label>
                                        <input className="profile__form-small-inputs" id="userPhone" name="userPhone" defaultValue="(416)-111-1111" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "userDetails")}} required />
                                    </div>
                                    <div className="profile__form-userDetails-container">
                                        <label className="profile__form-labels" htmlFor="userEmail">EMAIL</label>
                                        <input className="profile__form-small-inputs" id="userEmail" name="userEmail" defaultValue="spiderman@marvel.org" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "userDetails")}} required />
                                    </div>
                                </div>
                                <div className="profile__form-userDetails-container">
                                    <label className="profile__form-labels" htmlFor="userAddress">ADDRESS</label>
                                    <textarea className="profile__form-small-inputs profile__form-small-inputs--address" id="userAddress" name="userAddress" defaultValue="20 Ingram Street, New York City" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "userDetails")}} required />
                                </div>

                            </div>

                            {/* EDUCATION SECTION */}

                            <div className="profile__form-education">
                                <h2 className="profile__form-section-header">EDUCATION</h2>
                                <div className="profile__form-divider--row">
                                    <div className="profile__form-divider--column">
                                        <label className="profile__form-labels" htmlFor="userEducationInstitution">INSTITUTION (1)</label>
                                        <input className="profile__form-small-inputs" name="userEducationInstitution" id="userEducationInstitution" defaultValue="Empire State University" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "education")}} required />
                                        <select className="profile__form-selections" name="userEducationStatus" id="userEducationStatus" defaultValue="Obtained" required >
                                            <option value="">Select</option>
                                            <option value="In Progress">In progress</option>
                                            <option value="Obtained">Obtained</option>
                                        </select>
                                        <textarea className="profile__form-small-inputs profile__form-small-inputs--address" name="userEducation" id="userEducation" defaultValue="Bachelor of Sciences" required onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "education")}} />
                                        <label className="profile__form-labels" htmlFor="userEducationYr1">YEAR GRADUATED</label>
                                        <input className="profile__form-small-inputs" name="userEducationYr1" id="userEducationYr1" defaultValue="2010" required onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "education")}} />
                                    </div>
                                    <div className="profile__form-divider--column">
                                        <label className="profile__form-labels" htmlFor="userEducationInstitution2">INSTITUTION (2)</label>
                                        <input className="profile__form-small-inputs" name="userEducationInstitution2" id="userEducationInstitution2" defaultValue="Midtown High" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "education")}} />
                                        <select className="profile__form-selections" name="userEducationStatus2" id="userEducationStatus2" defaultValue="Obtained"> 
                                            <option value="">Select</option>
                                            <option value="In Progress">In progress</option>
                                            <option value="Obtained">Obtained</option>
                                        </select>
                                        <textarea className="profile__form-small-inputs profile__form-small-inputs--address" name="userEducation2" id="userEducation2" defaultValue="High School Diploma" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "education")}} />
                                        <label className="profile__form-labels" htmlFor="userEducationYr2">YEAR GRADUATED</label>
                                        <input className="profile__form-small-inputs" name="userEducationYr2" id="userEducationYr2" defaultValue="2006" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "education")}} />
                                    </div>
                                </div>
                            </div>

                            {/* EXPERIENCE SECTION */}

                            <div className="profile__form-experience">
                                <h2 className="profile__form-section-header">EXPERIENCE</h2>
                                <div className="profile__form-divider--row">
                                    <div className="profile__form-divider--column">
                                        <label className="profile__form-labels" htmlFor="userExperience">ROLE (1)</label>
                                        <input className="profile__form-small-inputs" name="userExperience" id="userExperience" defaultValue="Staff Photographer" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "experience")}} required />
                                        <label className="profile__form-labels" htmlFor="userExperienceOrg">ORGANIZATION</label>
                                        <input className="profile__form-small-inputs" name="userExperienceOrg" id="userExperienceOrg" defaultValue="The Daily Bugle" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "experience")}} required />
                                        <label className="profile__form-labels" htmlFor="userExperienceYear">YEAR(S)</label>
                                        <input className="profile__form-small-inputs" name="userExperienceYear" id="userExperienceYear" defaultValue="2010-Current" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "experience")}} required />
                                        <label className="profile__form-labels" htmlFor="userExperienceResp">KEY RESPONSIBILITIES</label>
                                        <button className="profile__form-add-button" type="button" onClick={() => {this.addInputClickHandler(1)}}>+</button>
                                        {this.addInputOnClick(1)}
                                    </div>
                                    <div className="profile__form-divider--column">
                                        <label className="profile__form-labels" htmlFor="userExperience2">ROLE (2)</label>
                                        <input className="profile__form-small-inputs" name="userExperience2" id="userExperience2" defaultValue="Avenger" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "experience")}} />
                                        <label className="profile__form-labels" htmlFor="userExperienceOrg2">ORGANIZATION</label>
                                        <input className="profile__form-small-inputs" name="userExperienceOrg2" id="userExperienceOrg2" defaultValue="The Avengers" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "experience")}} />
                                        <label className="profile__form-labels" htmlFor="userExperienceYear2">YEAR(S)</label>
                                        <input className="profile__form-small-inputs" name="userExperienceYear2" id="userExperienceYear2" defaultValue="2010-Present" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "experience")}} />
                                        <label className="profile__form-labels" htmlFor="userExperienceResp2">KEY RESPONSIBILITIES</label>
                                        <button className="profile__form-add-button" type="button" onClick={() => {this.addInputClickHandler(2)}}>+</button>
                                        {this.addInputOnClick(2)}
                                    </div>
                                </div>
                            </div>

                            {/* AWARDS / CERTIFICATIONS SECTION */}

                            <div className="profile__form-awards-certifications">
                                <h2 className="profile__form-section-header">AWARDS &amp; CERTIFICATIONS</h2>
                                <div className="profile__form-divider--row">
                                    <div className="profile__form-divider--column">
                                        <label className="profile__form-labels" htmlFor="userAwardCertType">AWARDS &amp; CERTIFICATIONS</label>
                                        <input className="profile__form-small-inputs" name="userAwardCert" defaultValue="Avenger Awards - Rookie of the Year" required />
                                        <select className="profile__form-selections" name="userAwardCertType" id="userAwardCertType" defaultValue="Award" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "awards")}} required>
                                            <option value="">Select</option>
                                            <option value="Award">Award</option>
                                            <option value="Certification">Certification</option>
                                        </select>
                                        <label className="profile__form-labels" htmlFor="userAwardCertYr">YEAR</label>
                                        <input className="profile__form-small-inputs" name="userAwardCertYr" id="userAwardCertYr" defaultValue="2010" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "awards")}} required />
                                    </div>
                                    <div className="profile__form-divider--column">
                                        <label className="profile__form-labels" htmlFor="userAwardCertType2">AWARDS &amp; CERTIFICATIONS</label>
                                        <input className="profile__form-small-inputs" name="userAwardCert2" defaultValue="Winner - The Daily Bugle Photo Contest" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "awards")}} />
                                        <select className="profile__form-selections" name="userAwardCertType2" id="userAwardCertType2" defaultValue="Award">
                                            <option value="">Select</option>
                                            <option value="Award">Award</option>
                                            <option value="Certification">Certification</option>
                                        </select>
                                        <label className="profile__form-labels" htmlFor="userAwardCertYr2">YEAR</label>
                                        <input className="profile__form-small-inputs" name="userAwardCertYr2" id="userAwardCertYr2" defaultValue="2012" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "awards")}} />
                                    </div>
                                </div>
                            </div>

                            {/* SKILLS SECTION */}

                            <div className="profile__form-skills">
                                <h2 className="profile__form-section-header profile__form-section-header--line-break">SKILLS &amp;</h2>
                                <h2 className="profile__form-section-header profile__form-section-header--line-break">INTERESTS</h2>
                                <label className="profile__form-labels" htmlFor="userSkills">SKILLS &amp; INTERESTS</label>
                                <input className="profile__form-small-inputs" name="userSkills" id="userSkills" defaultValue="Web slinging, climbing, hanging upside down, saving the world, photography, witty remarks" onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "skills")}} required></input>
                            </div> 
                            
                            {/* COVER LETTER SECTION */}

                            <div className="profile__form-coverLetter">
                                <h2 className="profile__form-section-header">COVER LETTER</h2>
                                <p className="profile__form-description">Please only include a response to why you would make a great candidate. The rest of the cover letter will be auto-generated.</p>
                                <textarea className="profile__form-coverLetterInput" name="userCoverLetter" id="userCoverLetter" defaultValue="I, Peter Parker, have proven to be an up and coming leader on The Avengers. Based on my past experiences, which include saving the world, amongst others, I feel I would be a tremendous fit at your organization." onKeyDown={(e) => {this.countCharactersOnKeyClick(e, "coverLetter")}} required />
                            </div>
                        </ScrollContainer>
                        
                    
                    
                </form>
                
                
                <img className="profile__background" src={newProfileBackground} />
            </div>
            
            
            
            
            </>
        )
    }
}

export default Profile;