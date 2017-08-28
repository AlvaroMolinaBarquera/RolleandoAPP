const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/login', (req, res) => {
	res.send('Success');
});

module.exports = router;