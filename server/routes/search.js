const express = require('express');
const app = express();
const router = express.Router();
const postingData = require('../data/postings');
const shortId = require('shortid');

const findPosting = (id) => {
    return postingData.find((arrayValue) => {
        return arrayValue.postingId === id;
    })
}

// Search GET endpoint used to pull all job postings from postingData
router.get('/search', (req, res) => {
    console.log("Request for all job postings has been received");
    res.send(postingData)
})

// Search GET endpoint used to pull a specific job posting from postingData

router.get('/search/:id', (req, res) => {
    console.log("Request for a specific job posting has been received");
    console.log(req.params.id);
    let posting = findPosting(req.params.id);
    console.log(posting);
    res.send(posting);
})

module.exports = router;
