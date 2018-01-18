const express = require('express');
const router = express.Router();
const tracesService = require('./../shared/traces.service');
const mongodbService = require('./../shared/mongodb.service');
const excelService = require ('./../shared/excel.service');
const fs = require('fs')

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

router.post('/excel', (req, res) => {
	var fileName = req.body.FILE_NAME;
	var data = req.body.TRANSACTION_DATA;
	excelService.trxToExcel(FILE_NAME, TRANSACTION_DATA)
		.then((response) => { res.send(response)})
		.catch((response) => { res.send(response)})
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
					let response = {HEADER: {SUCCESS: true}, BODY: {USER: result[0].USER, LAST_CONNECTION: result[0].LAST_CONNECTION, CHAT: result[0].CHAT}}
					res.send(response);
				} else {
					let response = {HEADER: {SUCCESS: false}, BODY: {}}
					res.send(response);
				}
			})
		break;
		case 'PRINT_STORY':
			mongodbService.databaseRecover('chatroom-chats', {}, (result) => {

				try {
					let p = '';
					for (let mess in result) {
						if (result[mess]['chatMessage']) {
						
							let chtMsg = result[mess]['chatMessage'];
							// Evitamos que si no nos llega chtMsg continue.
							if (!chtMsg) { continue };
							if (chtMsg.user !== (result[mess - 1] && result[mess - 1]['chatMessage'].user) ||chtMsg.alias !== (result[mess - 1] && result[mess - 1]['chatMessage'].alias)) {
								p = '';
								p += '\n';
							}
							if (mess === 0 || chtMsg.user !== (result[mess - 1] && result[mess - 1]['chatMessage'].user) ||
								chtMsg.alias !== (result[mess - 1] && result[mess - 1]['chatMessage'].alias)) {
									if (chtMsg.alias) {
													p += chtMsg.alias.toUpperCase() + ': ';
									} else {
													p += chtMsg.user.toUpperCase() + ': ';      
									}
							}
							//  Muestra un mensaje para quien va dirigido, por ejemplo (A Galael);
							if (result[mess]['params'] && result[mess]['params']['to']) {
								p += '(A ' + result[mess]['params']['to'] + ')';
							}
							p += chtMsg.text;

							if (!chtMsg.text.endsWith('.')) { p += '. '};
						}

					}
					let response = {HEADER: {SUCCESS: true}, BODY: { CONTENT: p}}
					res.send(response)
					
				} catch (e) {
					tracesService.writeTrace(
							tracesService.TRACES_LEVEL.ERROR,
							'Error creando el archivo para descargar ',
							e);					
					let response = {HEADER: {SUCCESS: false}, BODY: {}}
					res.send(response);
				}

			});
			break;
		case 'REGISTER':
			var response = null;
			mongodbService.databaseRecover('user_list', req.body.BODY, (result) => {
				if (result && result.length !== 0) {
					for (user in result) {
						tracesService.writeTrace(
							tracesService.TRACES_LEVEL.DEBUG, 
							'REGISTER: result User/req.body.BODY.USER', 
							[result[user].USER, req.body.BODY.USER]
						);
						if (result[user].USER === req.body.BODY.USER) {
							response = {HEADER: {SUCCESS: false}, BODY: {ERROR: 'El usuario ya existe'}}
							res.send(response);
							break;
						}
					}

				}
				if (response === null) {
					mongodbService.databaseInsertOne('user_list', req.body.BODY, (result) => {
						response = {HEADER: {SUCCESS: true}, BODY: {}};
						res.send(response);
					})
				}
			});
		default:
			
		break;	
	}
});

module.exports = router;
