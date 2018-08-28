var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen('2000', function() {
	console.log('listening at port 2000');
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('a user has connected');
	socket.on('disconnect', function() {
		console.log('a user has disconnected');
	})
  	socket.on('chat message', function(msg){
    		io.emit('chat message', msg);
	});
	socket.on('get video', function(link) {
			io.emit('get video', link);
	});
});

