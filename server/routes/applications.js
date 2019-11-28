const express = require('express');
const app = express();
const router = express.Router();
const profileData = require('../data/applications.json');
const postingData = require('../data/postings');
const applicationData = require('../data/applications');
const moment = require('moment');
const shortId = require('shortid');

// Function pushes a submitted application containing the job posting ID and profile ID to the applications array
const postApplication = (profile, posting) => {
    const currentDate = new Date();
    const relativeDate = moment().format("MMM Do YYYY");

    const newApplication = {
        applicationId : shortId.generate(),
        postingId : posting,
        profileId : profile,
        submissionDate : relativeDate
    }
    
    applicationData.push(newApplication);
}

const findApplication = (id) => {
    return applicationData.find((arrayValue) => {
        return arrayValue.applicationId === id;
    })
}


// /applications endpoint takes the request's profile ID and postingID and runs a postApplication() to push the
// application to the applications array 
router.post('/applications', (req, res) => {
    console.log("Request to post a new application has been received")
    const submitterProfile = req.body.profileId;
    const submittedJob = req.body.postingId;

    if (submitterProfile && submittedJob) {
        postApplication(submitterProfile, submittedJob);
        res.send("Your application has been received");
    } else {
        res.status(404).send("404: Your submission failed!")
    }
})

// /applications GET endpoint responds with all submitted applications stored in applicationsData
router.get('/applications', (req, res) => {
    console.log("Request for all applications has been received.")
    if (applicationData.length > 0) {
        res.send(applicationData);
    } else {
        res.status(404).send("No applications have been submitted");
    }
})

// /applications/:id GET endpoints responds with the requested application if it exists
router.get('/applications/:id', (req, res) => {
    console.log("Request for application has been received.")
    const applicationId = req.params.id;
    const requestedApplication = findApplication(applicationId);

    if (requestedApplication) {
        res.send(requestedApplication);
    } else {
        res.status(404).send("Requested application not found");
    }
})


module.exports = router;