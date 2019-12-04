const express = require('express');
const app = express();
const router = express.Router();
const profileData = require('../data/profiles.json');
const shortId = require('shortid');

// FUNCTIONS TO RETRIEVE/MANIPULATE PROFILE DATA

// Function to pull the correct user profile from profiles.json
const findProfile = (id) => {
    return profileData.find((arrayValue) => {
        return arrayValue.profileId === id;
    })
}

// Function to push submitted profile to profileData array. Each pushed profile has a unique profileId generated
const postProfile = (profile) => {
    profile.profileId = shortId.generate();
    profileData.push(profile);
}

// ROUTER ENDPOINTS

// /profiles POST endpoint used to submit a new user profile
router.post('/profiles', (req, res) => {
    console.log("Request to post a new profile has been received")
    if (req.body) {
        postProfile(req.body);
        console.log(profileData);
        res.send("Your request has been received!");
    } else {
        res.status(404).send("404: Profile submission failed!");
    }
})

// /profiles/:id GET endpoint used to pull a specific user profile
router.get('/profiles/:id', (req, res) => {
    console.log("Request for a specific profile has been received");
    const profileId = req.params.id;
    const requestedProfile = findProfile(profileId);

    if (requestedProfile) {
        res.send(requestedProfile);
    } else {
        res.status(404).send("404: Profile was not found!");
    }
})

// /profiles/:id GET endpoint used to pull all user profiles
router.get('/profiles', (req, res) => {
    console.log("Request for all profiles has been received");
    if (profileData.length > 0) {
        res.send(profileData);
    } else {
        res.status(404).send("No profiles have been submitted");
    }
})

module.exports = router;