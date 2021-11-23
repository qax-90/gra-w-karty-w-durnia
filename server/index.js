const express = require('express');
const app = express();
const http = require('http');
const httpServer =  http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer);
const path = require('path');
const fs = require('fs');
const httpPort = process.env.PORT || 3001;

function currentTime(time) {
	let hours = (time.getHours() < 10) ? '0' + time.getHours() : time.getHours();
	let minutes = (time.getMinutes() < 10) ? '0' + time.getMinutes() : time.getMinutes();
	let seconds = (time.getSeconds() < 10) ? '0' + time.getSeconds() : time.getSeconds();
	let milliseconds = 0;
	if (time.getMilliseconds() < 10) milliseconds = '00' + time.getMilliseconds();
	else if (time.getMilliseconds() < 100) milliseconds = '0' + time.getMilliseconds();
	else milliseconds = time.getMilliseconds();
	return hours + ':' + minutes + ':' + seconds + ',' + milliseconds;
}

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function(req, res){
	res.send('To jest pusta strona!');
});

app.get('/gra-w-karty-w-durnia', function(req, res){
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

httpServer.listen(httpPort, fs.readFileSync(__dirname + '/ip.txt', 'utf8').trim(), function() {
	time = Date.now();
	console.log(currentTime(new Date(time)) + ' - Serwer został uruchomiony pod adresem ' + httpServer.address().address + '/gra-w-karty-w-durnia na porcie ' + httpServer.address().port);
});

io.on('connection', (socket) => {
  console.log(currentTime(new Date(time)) + ' - Nawiązano połączenie z nowym klientem o ID ' + socket.id);
  socket.on('disconnect', () => {
    console.log(currentTime(new Date(time)) + ' - Zerwano połączenie z klientem o ID ' + socket.id);
  });
});
