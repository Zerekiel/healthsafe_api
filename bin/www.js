#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('betaapi:server');
const http = require('http');
const https = require('https');
const configServer = require('../sources/server/configServer/configServer');
const fs = require('fs');

/**
 * TLS certificate
 */
 const privateKey = fs.readFileSync('/etc/letsencrypt/live/x2021healthsafe1051895009000.northeurope.cloudapp.azure.com/privkey.pem', 'utf8');
 const certificate = fs.readFileSync('/etc/letsencrypt/live/x2021healthsafe1051895009000.northeurope.cloudapp.azure.com/cert.pem', 'utf8');
 const ca = fs.readFileSync('/etc/letsencrypt/live/x2021healthsafe1051895009000.northeurope.cloudapp.azure.com/chain.pem', 'utf8');

 const credentials = {
 	key: privateKey,
 	cert: certificate,
 	ca: ca
 };

if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();


        /**
         * Get port from environment and store in Express.
         */
        const port = normalizePort(process.env.PORT_SERVER || '6000');
	console.log(port)
        /**
         * Create HTTPS server.
         */
        const server = https.createServer(credentials, app);

        /**
         * Options Server on requests.
         */
        server.on('request', configServer.displayURL);

        /**
         * Listen on provided port, on all network interfaces.
         */
        server.listen(port, () => {
                console.log(`Server HTTPS is running on port : ${port}`);
        });

        /**
         * Call functions Event listener for HTTPS server "error"/"listening" event.
         */
        server.on('error', onError);
        server.on('listening', onListening);

        /**
         * Event listener for HTTPS server "error" event.
         */
        function onError(error) {
                if (error.syscall !== 'listen') {
                        throw error;
                }

                var bind = typeof port === 'string'
                        ? 'Pipe ' + port
                        : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
                case 'EACCES':
                        console.error(bind + ' requires elevated privileges');
                        process.exit(1);
                        break;
                case 'EADDRINUSE':
                        console.error(bind + ' is already in use');
                        process.exit(1);
                        break;
                default:
                        throw error;
                }
        }

        /**
         * Event listener for HTTPS server "listening" event.
         */
        function onListening() {
                var addr = server.address();
                var bind = typeof addr === 'string'
                        ? 'pipe ' + addr
                        : 'port ' + addr.port;
                debug('Listening on ' + bind);
        }
} else {

        /**
         * Get port from environment and store in Express.
         */
        const port = normalizePort(process.env.PORT || '5000');
        app.set('port', port);

        /**
         * Create HTTP server.
         */
        const server = https.createServer(credentials, app);

        /**
         * Options Server on requests.
         */
        server.on('request', configServer.urlDisplay);

        /**
         * Listen on provided port, on all network interfaces.
         */
        server.listen(port, () => {
                console.log(`Server HTTPS is running on port : ${port}`);
        });

        /**
         * Call functions Event listener for HTTPS server "error"/"listening" event.
         */
        server.on('error', onError);
        server.on('listening', onListening);

        /**
         * Event listener for HTTP server "error" event.
         */
        function onError(error) {
                if (error.syscall !== 'listen') {
                        throw error;
                }

                var bind = typeof port === 'string'
                        ? 'Pipe ' + port
                        : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
                case 'EACCES':
                        console.error(bind + ' requires elevated privileges');
                        process.exit(1);
                        break;
                case 'EADDRINUSE':
                        console.error(bind + ' is already in use');
                        process.exit(1);
                        break;
                default:
                        throw error;
                }
        }

        /**
         * Event listener for HTTP server "listening" event.
         */
        function onListening() {
                var addr = server.address();
                var bind = typeof addr === 'string'
                        ? 'pipe ' + addr
                        : 'port ' + addr.port;
                debug('Listening on ' + bind);
        }
}


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
