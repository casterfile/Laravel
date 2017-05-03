var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function(require,response){
	// response.send("Hello WOrld");
	response.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
	socket.on('chat.message', function(message){
		console.log('New Message: ' + message);
		io.emit('chat.message',message);
	});

	socket.on('disconnect', function(){
		io.emit('chat.message', 'User has disconnected');
	});
});

console.log("Go to localhost:3000");