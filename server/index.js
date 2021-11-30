const express = require('express');
const app = express();
const http = require('http');
const httpServer =  http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer);
const path = require('path');
const fs = require('fs');
const httpPort = process.env.PORT || 3001;

var time;

var playingRooms = [{
	playingRoomId: 0,
	stateClass: 'waiting',
	stateName: 'Oczekuje na graczy',
	maxPlayers: 3,
	chairs: [{
		chairId: 0,
		playerId: 1
	},
	{
		chairId: 1,
		playerId: 0
	},
	{
		chairId: 2,
		playerId: 'not-assigned'
	},
	{
		chairId: 3,
		playerId: 'not-available'
	}],
	players: [
		{
			socketId: 9,
			playerId: 0,
			loginName: 'one'
		},
		{
			socketId: 3,
			playerId: 1,
			loginName: 'two'
		}],
	durationTime: 621,
	lowestCard: 6
},
{
	playingRoomId: 1,
	stateClass: 'ready',
	stateName: 'Gotowa do otwarcia',
	maxPlayers: 0,
	chairs: [{
		chairId: 0,
		playerId: 'not-assigned'
	},
	{
		chairId: 1,
		playerId: 'not-assigned'
	},
	{
		chairId: 2,
		playerId: 'not-assigned'
	},
	{
		chairId: 3,
		playerId: 'not-assigned'
	}],
	players: [
	],
	durationTime: 0,
	lowestCard: 0
}];

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
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

httpServer.listen(httpPort, fs.readFileSync(__dirname + '/ip.txt', 'utf8').trim(), function() {
	time = Date.now();
	console.log(currentTime(new Date(time)) + ' - Serwer został uruchomiony pod adresem ' + httpServer.address().address + ' na porcie ' + httpServer.address().port);
});

io.on('connection', (socket) => {
	time = Date.now();
  console.log(currentTime(new Date(time)) + ' - Nawiązano połączenie z nowym klientem o ID gniazda ' + socket.id);
  socket.on('disconnect', () => {
		time = Date.now();
    console.log(currentTime(new Date(time)) + ' - Zerwano połączenie z klientem o ID gniazda ' + socket.id);
  });
	socket.on('login-user', (data) => {
		time = Date.now();
		let loginName = data.loginName;
		console.log(currentTime(new Date(time)) + ' - Klient o ID gniazda ' + socket.id + ' wybrał login ' + loginName);
		socket.emit('playing-rooms', {playingRooms: playingRooms});
	});
	socket.on('join-room', (data) => {
		let socketId = socket.id;
		let playingRoomId = data.playingRoomId;
		let loginName = data.loginName;
		let playerId = Math.max.apply(Math, playingRooms[playingRoomId].players.map(item => item.playerId)) + 1;
		if (playingRooms[playingRoomId].players.length < playingRooms[playingRoomId].maxPlayers) {
			playingRooms[playingRoomId].players.push({socketId: socketId, playerId: playerId, loginName: loginName});
			if (playingRooms[playingRoomId].players.length === playingRooms[playingRoomId].maxPlayers) {
				playingRooms[playingRoomId].stateClass = 'playing';
				playingRooms[playingRoomId].stateName = 'W trakcie gry';
			}
			io.to(socketId).emit('join-room', {playerId: playerId});
			socket.join(playingRoomId);
			io.emit('playing-rooms', {playingRooms: playingRooms});
			console.log(currentTime(new Date(time)) + ' - Klient o nazwie użytkownika ' + loginName + ' wszedł do pokoju o ID ' + playingRoomId);
		}
	});
	socket.on('create-room', (data) => {
		let socketId = socket.id;
		let playingRoomId = data.playingRoomId;
		let loginName = data.loginName
		let playerId = 0;
		let maxPlayers = data.roomMaxPlayers;
		let roomDurationTime = parseInt(data.roomDurationTimeMins) * 60 + parseInt(data.roomDurationTimeSecs);
		let roomLowestCard = data.roomLowestCard;
		playingRooms[playingRoomId].stateClass = 'waiting';
		playingRooms[playingRoomId].stateName = 'Oczekuje na graczy';
		playingRooms[playingRoomId].maxPlayers = maxPlayers;
		playingRooms[playingRoomId].durationTime = roomDurationTime;
		playingRooms[playingRoomId].lowestCard = roomLowestCard;
		playingRooms[playingRoomId].players.push({socketId: socketId, playerId: playerId, loginName: loginName});
		io.to(socketId).emit('join-room', {playerId: playerId});
		socket.join(playingRoomId);
		socket.emit('playing-rooms', {playingRooms: playingRooms});
		console.log(currentTime(new Date(time)) + ' - Klient o nazwie użytkownika ' + loginName + ' stworzył nowy pokój o ID ' + playingRoomId);
	});
	socket.on('chat-message', (data) => {
		time = Date.now();
		io.emit('chat-message', {data: data, time: time, loginName: playingRooms[0].players.find(player => player.socketId === socket.id).loginName});
	});
});
