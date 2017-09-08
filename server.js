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

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname));
});

let activeUsers = {};
// IO
io.on('connection', (socket) => {
     tracesService.writeTrace(tracesService.TRACES_LEVEL.DEBUG, 'socketConnection: Se ha conectado un usuario: ', {id: socket.client.id, name: socket.handshake.query.name})
    activeUsers[socket.handshake.query.name] = socket.client.id
    socket.on('disconnect', function() {
        tracesService.writeTrace(tracesService.TRACES_LEVEL.DEBUG, 'socketConnection: Se ha desconectado un usuario: ', {id: socket.client.id, name: activeUsers[socket.client.id]} )
    	for (let user in activeUsers) {
    		if (activeUsers[user] === socket.client.id) {
    			delete activeUsers[user];
    			break;
    		}
    	}
        delete activeUsers[socket.client.id];
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