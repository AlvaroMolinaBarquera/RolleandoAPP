// Get dependencies
const express = require('express');
const path = require('path');
var app = module.exports = express();
const http = require('http').Server(app)
const bodyParser = require('body-parser');
const compression = require('compression');
var io = require('socket.io')(http);
const tracesService = require('./server/shared/traces.service.js')
const mongodbService = require('./server/shared/mongodb.service.js')

// Compress all files in gzip
app.use(compression())

// Get our API routes
const api = require('./server/routes/api');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'src')));

// Set our api routes
app.use('/api', api);

app.get('/server/downloads/*', (req, res) => {
	let file = __dirname + req.url
	tracesService.writeTrace(tracesService.TRACES_LEVEL.INFO, 'getDownload: Se ha recibido la petición de descarga para la siguiente url ', file)
	res.download(file);
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname));
});

let activeUsers = {};
// IO
io.on('connection', (socket) => {
    tracesService.writeTrace(tracesService.TRACES_LEVEL.DEBUG, 'socketConnection: Se ha conectado un usuario: ', {id: socket.client.id, name: socket.handshake.query.name, lastConnection: socket.handshake.query.lastConnection})
    // Al conectarse un nuevo usuario se guarda en la lista de usuarios activos
    activeUsers[socket.handshake.query.name] = socket.client.id
    if (socket.handshake.query.lastConnection) {
    	// Cuando el usuario se conecta devuelve todos los mensajes desde su ultima conexión
    	mongodbService.databaseRecover('chatroom-chats', {timestamp: {$gt: Number(socket.handshake.query.lastConnection)}}, (result) => {
    		tracesService.writeTrace(tracesService.TRACES_LEVEL.DEBUG, 'socketConnection: El usuario activo se conectó por ultima vez ' +  socket.handshake.query.lastConnection + ' se procede adevolver los siguientes datos: ', result)
    		io.to(socket.client.id).emit('message', result)
    	})
    }
    socket.on('disconnect', function() {
    	for (let user in activeUsers) {
    		if (activeUsers[user] === socket.client.id) {
    	        // Cuando el usuario se desconecta se borra de la lsita de usuarios conectados y se actualiza la ultima vez que se desconectó
    			tracesService.writeTrace(tracesService.TRACES_LEVEL.DEBUG, 'socketConnection: Se ha desconectado un usuario: ', {id: socket.client.id, name: user} )
    	        mongodbService.databaseUpdateOne('user_list', {USER: user}, {$set: { LAST_CONNECTION: new Date().getTime()}})
    			delete activeUsers[user];
    			break;
    		}
    	}
        
    });

    socket.on('add-message', (message) => {
    	if (message && message.params && message.params.to) {
    		io.to(activeUsers[message.params.to]).to(socket.client.id).emit('message', message);
    	} else {
            io.emit('message', message);    		
    	}
        // Function above that stores the message in the database
        let storeData = { chatMessage: message, timestamp: new Date().getTime() }
        mongodbService.databaseStore('chatroom-chats', storeData)
    });

});



/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3333';
app.set('port', port);

/**
 * Create HTTP server.
 
const server = http.createServer(app);
*/

/**
 * Listen on provided port, on all network interfaces.
 */
http.listen(port, () => tracesService.writeTrace(tracesService.TRACES_LEVEL.INFO, 'API running on localhost: ',  port));