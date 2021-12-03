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
	chairs: [],
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
	maxPlayers: null,
	chairs: [],
	players: [],
	durationTime: null,
	lowestCard: null
}];

function currentTime(time, showMilisecs = true) {
	let hours = (time.getHours() < 10) ? '0' + time.getHours() : time.getHours();
	let minutes = (time.getMinutes() < 10) ? '0' + time.getMinutes() : time.getMinutes();
	let seconds = (time.getSeconds() < 10) ? '0' + time.getSeconds() : time.getSeconds();
	if (showMilisecs === true) {
		let milliseconds = 0;
		if (time.getMilliseconds() < 10) milliseconds = '00' + time.getMilliseconds();
		else if (time.getMilliseconds() < 100) milliseconds = '0' + time.getMilliseconds();
		else milliseconds = time.getMilliseconds();
		return hours + ':' + minutes + ':' + seconds + ',' + milliseconds;
	} else if (showMilisecs === false) {
		return hours + ':' + minutes + ':' + seconds;
	}
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
	socket.on('prepare-room', (data) => {
		let playingRoomId = parseInt(data.playingRoomId);
		let loginName = data.loginName.toString();
		playingRooms[playingRoomId].stateClass = 'preparing';
		playingRooms[playingRoomId].stateName = 'W trakcie przygotowania';
		io.emit('playing-rooms', {playingRooms: playingRooms});
		console.log(currentTime(new Date(time)) + ' - Klient o nazwie użytkownika ' + loginName + ' przygotowuje nowy pokój o numerze ' + (playingRoomId + 1));
	});
	socket.on('join-room', (data) => {
		let socketId = socket.id;
		let playingRoomId = parseInt(data.playingRoomId);
		let loginName = data.loginName.toString();
		let maxPlayers = parseInt(playingRooms[playingRoomId].maxPlayers);
		let playerId = parseInt(Math.max.apply(Math, playingRooms[playingRoomId].players.map(item => item.playerId)) + 1);
		if (playingRooms[playingRoomId].players.length < maxPlayers) {
			playingRooms[playingRoomId].players.push({socketId: socketId, playerId: playerId, loginName: loginName});
			if (playingRooms[playingRoomId].players.length === maxPlayers) {
				playingRooms[playingRoomId].stateClass = 'playing';
				playingRooms[playingRoomId].stateName = 'W trakcie gry';
			}
			io.to(socketId).emit('join-room', {playerId: playerId});
			socket.join(playingRoomId);
			io.emit('playing-rooms', {playingRooms: playingRooms});
			console.log(currentTime(new Date(time)) + ' - Klient o nazwie użytkownika ' + loginName + ' wszedł do pokoju o numerze ' + (playingRoomId + 1));
		}
	});
	socket.on('create-room', (data) => {
		let socketId = socket.id;
		let playingRoomId = parseInt(data.playingRoomId);
		let loginName = data.loginName.toString();
		let playerId = 0;
		let maxPlayers = parseInt(data.roomMaxPlayers);
		let roomDurationTime = parseInt(data.roomDurationTimeMins) * 60 + parseInt(data.roomDurationTimeSecs);
		let roomLowestCard = parseInt(data.roomLowestCard);
		playingRooms[playingRoomId].stateClass = 'waiting';
		playingRooms[playingRoomId].stateName = 'Oczekuje na graczy';
		playingRooms[playingRoomId].maxPlayers = maxPlayers;
		playingRooms[playingRoomId].durationTime = roomDurationTime;
		playingRooms[playingRoomId].lowestCard = roomLowestCard;
		playingRooms[playingRoomId].players.push({socketId: socketId, playerId: playerId, loginName: loginName});
		playingRooms[playingRoomId].chairs = [];
		for (let loop = 0; loop < 4; loop++) {
			let chairId = loop;
			if (chairId <= maxPlayers - 1) {
				playingRooms[playingRoomId].chairs.push({chairId: chairId, playerId: 'not-assigned'});
			} else {
				playingRooms[playingRoomId].chairs.push({chairId: chairId, playerId: 'not-available'});
			}
		}
		io.to(socketId).emit('join-room', {playerId: playerId});
		socket.join(playingRoomId);
		io.emit('playing-rooms', {playingRooms: playingRooms});
		console.log(currentTime(new Date(time)) + ' - Klient o nazwie użytkownika ' + loginName + ' stworzył nowy pokój o numerze ' + (playingRoomId + 1));
	});
	socket.on('sit-down', (data) => {
		let playingRoomId = parseInt(data.playingRoomId);
		let chairId = parseInt(data.chairId);
		let playerId = parseInt(playingRooms[playingRoomId].players.find(player => player.socketId === socket.id).playerId);
		let loginName = playingRooms[playingRoomId].players.find(player => player.socketId === socket.id).loginName.toString();
		playingRooms[playingRoomId].chairs.find(chair => chair.chairId === chairId).playerId = playerId;
		io.emit('playing-rooms', {playingRooms: playingRooms});
		console.log(currentTime(new Date(time)) + ' - Klient o nazwie użytkownika ' + loginName + ' usiadł na krześle numer ' + (chairId + 1) + ' w pokoju nr ' + (playingRoomId + 1));
		if (playingRooms[playingRoomId].chairs.filter(chair => chair.playerId === 'not-assigned').length === 0) {
			io.emit('start-game-alert');
		}
	});
	socket.on('chat-message', (data) => {
		time = Date.now();
		let message = data.message.toString();
		let playingRoomId = parseInt(data.playingRoomId);
		let addTime = currentTime(new Date(time), false).toString();
		let loginName = playingRooms[playingRoomId].players.find(player => player.socketId === socket.id).loginName.toString();
		io.in(playingRoomId).emit('chat-message', {message: message, addTime: addTime, loginName: loginName});
	});
	socket.on('start-game', (data) => {
		let playingRoomId = parseInt(data.playingRoomId);
		let playerId = parseInt(playingRooms[playingRoomId].players.find(player => player.socketId === socket.id).playerId);
		let loginName = playingRooms[playingRoomId].players.find(player => player.socketId === socket.id).loginName.toString();
		io.emit('start-game');
		console.log(currentTime(new Date(time)) + ' - Klient o nazwie użytkownika ' + loginName + ' rozpoczął grę w pokoju nr ' + (playingRoomId + 1));
	});
});
