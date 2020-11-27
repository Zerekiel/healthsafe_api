const socketio = require('socket.io');
//CONTROLLER
//initialize socket for the server
const socketConnection = (server) => {
	return new Promise((resolve, reject) => {
		if (server) {
			const io = socketio(server);
			// Connection
			return resolve(
				io.on('connection', socket => {
					const user = socket.id;
					var messages = [];

  					io.to(socket.id).emit('private', 'youre secret code is ');
					socket.emit('recupererMessages', messages);

					// Quand on reçoit un nouveau message

					socket.on('nouveauMessage', function (mess) {

					    // On l'ajoute au tableau (variable globale commune à tous les clients connectés au serveur)

					    messages.push(mess);
					    // On envoie à tout les clients connectés (sauf celui qui a appelé l'événement) le nouveau message
					    socket.broadcast.emit('recupererNouveauMessage', mess);
					});
				}));
		} else {
			return reject(console.error('SOCKET.IO Connection error.'));
		}
	})
	.catch(err => {
		return err.stack;
	});
};


module.exports = {
	socketConnection
}
