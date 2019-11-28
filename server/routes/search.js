const express = require('express');
const app = express();
const router = express.Router();
const postingData = require('../data/postings');
const shortId = require('shortid');


// Search GET endpoint used to pull all job postings from postingData
router.get('/search', (req, res) => {
    console.log("Request for all job postings has been received");
    res.send(postingData)
})

module.exports = router;
