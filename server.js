// Get dependencies
const express = require('express');
const path = require('path');
var app = module.exports = express();
const http = require('http').Server(app)
const bodyParser = require('body-parser');
var io = require('socket.io')(http);
const tracesService = require('./server/shared/traces.service.js')
const mongodbService = require('./server/shared/mongodb.service.js')

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

// IO
io.on('connection', (socket) => {
     tracesService.writeTrace(tracesService.TRACES_LEVEL.DEBUG, 'socketConnection: Se ha conectado un usuario: ', socket.client.id)

    socket.on('disconnect', function() {
        tracesService.writeTrace(tracesService.TRACES_LEVEL.DEBUG, 'socketConnection: Se ha desconectado un usuario: ', socket.client.id)
    });

    socket.on('add-message', (message) => {
        io.emit('message', message);
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