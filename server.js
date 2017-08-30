// Get dependencies
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app)
const bodyParser = require('body-parser');
var io = require('socket.io')(http);

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

    console.log('user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        io.emit('message', { type: 'new-message', text: message });
        // Function above that stores the message in the database
        // databaseStore(message)
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
http.listen(port, () => console.log(`API running on localhost:${port}`));