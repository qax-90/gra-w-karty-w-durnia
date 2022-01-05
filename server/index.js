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
	chairs: [
		{chairId: 0, playerId: 0},
		{chairId: 1, playerId: 1},
		{chairId: 2, playerId: 'not-assigned'},
		{chairId: 3, playerId: 'not-available'}
	],
	players: [
		{
			socketId: 9,
			playerId: 1,
			loginName: 'neo'
		},
		{
			socketId: 3,
			playerId: 0,
			loginName: 'max'
		}],
	durationTime: 340,
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

var playersElapsedTime = [];

var tableCardsDeck = [{
	playingRoomId: 0, cardsDeck: []
}];

var stackCardsDeck = [{
	playingRoomId: 0, cardsDeck: []
}];

var playersCardsDecks = [];

function currentTime(someTime, showMilisecs = true) {
	let hours = (someTime.getHours() < 10) ? '0' + someTime.getHours() : someTime.getHours();
	let minutes = (someTime.getMinutes() < 10) ? '0' + someTime.getMinutes() : someTime.getMinutes();
	let seconds = (someTime.getSeconds() < 10) ? '0' + someTime.getSeconds() : someTime.getSeconds();
	let milliseconds = 0;
	let output;
	if (someTime.getMilliseconds() < 10) milliseconds = '00' + someTime.getMilliseconds();
	else if (someTime.getMilliseconds() < 100) milliseconds = '0' + someTime.getMilliseconds();
	else milliseconds = someTime.getMilliseconds();
	if (showMilisecs === true) {
		output = hours + ':' + minutes + ':' + seconds + ',' + milliseconds;
	} else if (showMilisecs === false) {
		output = hours + ':' + minutes + ':' + seconds;
	}
	return output;
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
		time = Date.now();
		let playingRoomId = parseInt(data.playingRoomId);
		let loginName = data.loginName.toString();
		playingRooms[playingRoomId].stateClass = 'preparing';
		playingRooms[playingRoomId].stateName = 'W trakcie przygotowania';
		io.emit('playing-rooms', {playingRooms: playingRooms});
		console.log(currentTime(new Date(time)) + ' - Klient o nazwie użytkownika ' + loginName + ' przygotowuje nowy pokój o numerze ' + (playingRoomId + 1));
	});
	socket.on('join-room', (data) => {
		time = Date.now();
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
		time = Date.now();
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
		time = Date.now();
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
		time = Date.now();
		let playingRoomId = parseInt(data.playingRoomId);
		let playerId = parseInt(playingRooms[playingRoomId].players.find(player => player.socketId === socket.id).playerId);
		let loginName = playingRooms[playingRoomId].players.find(player => player.socketId === socket.id).loginName.toString();
		let randomCardsDeck = [];
		playersElapsedTime = [];
		for (let loop = playingRooms[playingRoomId].lowestCard; loop <= 14; loop++) {
			for (let loop2 = 0; loop2 <= 3; loop2++) {
				randomCardsDeck.push([loop, loop2]);
			}
		}
		let cardsAmount = randomCardsDeck.length;
		let randomNumber = 0;
		let temp;
		while (cardsAmount--) {
			randomNumber = Math.floor(Math.random() * (cardsAmount + 1));
			temp = randomCardsDeck[cardsAmount];
			randomCardsDeck[cardsAmount] = randomCardsDeck[randomNumber];
			randomCardsDeck[randomNumber] = temp;
		}
		let cardsDeck = [];
		let ownCardsDeck = [];
		let socketId;
		for (let loop = 0; loop < 6; loop++) {
			playingRooms[playingRoomId].players.forEach(player => {
				if (typeof cardsDeck[player.playerId] === 'undefined') {
					cardsDeck[player.playerId] = [];
				}
				cardsDeck[player.playerId].push(randomCardsDeck.pop());
			});
		}
		playingRooms[playingRoomId].players.forEach(player => {
			ownCardsDeck = [];
			playersCardsDecks.push({playingRoomId: playingRoomId, playerId: player.playerId, cardsDeck: cardsDeck[player.playerId]});
			playingRooms[playingRoomId].players.find(player2 => player2.playerId === player.playerId).cardsAmount = cardsDeck[player.playerId].length;
			playersElapsedTime.push({playingRoomId: playingRoomId, playerId: player.playerId, time: playingRooms[playingRoomId].durationTime});
			for (let loop = 0; loop < cardsDeck[player.playerId].length; loop++) {
				cardsDeck[player.playerId][loop][2] = false;
				ownCardsDeck = cardsDeck[player.playerId];
			}
			socketId = playingRooms[playingRoomId].players.find(player2 => player2.playerId === player.playerId).socketId;
			io.to(socketId).emit('own-cards-deck', {ownCardsDeck: ownCardsDeck});
		});
		io.in(playingRoomId).emit('start-game', {playingRooms: playingRooms, playersElapsedTime: playersElapsedTime});
		console.log(currentTime(new Date(time)) + ' - Klient o nazwie użytkownika ' + loginName + ' rozpoczął grę w pokoju nr ' + (playingRoomId + 1));
	});
});
