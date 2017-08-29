const express = require('express');
const router = express.Router();
const tracesService = require('./../shared/traces.service');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});



router.post('/traces', (req, res) => {
	var level = req.body.LEVEL;
	var message = req.body.MESSAGE
	var params = req.body.PARAMS;
	var metaObj = {
		USUARIO: req.body.USUARIO || '',
		FILE: req.body.FILE || ''
	};
	tracesService.writeTrace(level, message, params, metaObj);
	
});

//Get all posts
router.post('/login', (req, res) => {
	console.log('Petición recibida', req)
	res.send('Success');
});
module.exports = router;