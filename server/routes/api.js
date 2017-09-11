const express = require('express');
const router = express.Router();
const tracesService = require('./../shared/traces.service');
const mongodbService = require('./../shared/mongodb.service')
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
router.post('/transactions', (req, res) => {
	let transaction = req.body.HEADER.TRANSACTION;
	tracesService.writeTrace(
			tracesService.TRACES_LEVEL.INFO,
			'TRANSACCIÓN RECIBIDA ' + transaction,
			req.body);	
	switch(transaction){
		case 'LOGIN':
			mongodbService.databaseRecover('user_list', req.body.BODY, (result) => {
				tracesService.writeTrace(
						tracesService.TRACES_LEVEL.INFO,
						'Datos obtenidos de la bd ',
						result);
				if (result && result.length !== 0) {
					let response = {HEADER: {SUCCESS: true}, BODY: {USER: result[0].USER, LAST_CONNECTION: result[0].LAST_CONNECTION}}
					res.send(response);
				} else {
					let response = {HEADER: {SUCCESS: false}, BODY: {}}
					res.send(response);
				}
			})

		break;
		default:
			
		break;	
	}
});
module.exports = router;