const express = require('express');
const router = express.Router();
const tracesService = require('./../shared/traces.service');
const mongodbService = require('./../shared/mongodb.service')
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
				const TEMP_DIR = '/server/downloads/';
				const TEMP_FILE = new Date().getTime() + '_story.txt';
				try {
					var fd = fs.openSync(TEMP_FILE, 'w');
					let p = '';
					for (let mess in result) {
						if (result[mess]['chatMessage']) {
							let chtMsg = result[mess]['chatMessage']; 
							if (chtMsg.user !== (result[mess - 1] && result[mess - 1]['chatMessage'].user) ||chtMsg.alias !== (result[mess - 1] && result[mess - 1]['chatMessage'].alias)) {
								fs.writeFileSync('.' + TEMP_DIR + TEMP_FILE, p, {flag: 'a'});
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
					let response = {HEADER: {SUCCESS: true}, BODY: { URL: TEMP_DIR + TEMP_FILE}}
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
		default:
			
		break;	
	}
});
module.exports = router;
