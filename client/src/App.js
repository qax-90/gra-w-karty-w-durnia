import React, { Component } from 'react';
import Rules from './Rules';
import LeftPlayerStatus from './LeftPlayerStatus';
import TopPlayerStatus from './TopPlayerStatus';
import RightPlayerStatus from './RightPlayerStatus';
import BottomPlayerStatus from './BottomPlayerStatus';
import LeftPlayerCardsDeck from './LeftPlayerCardsDeck';
import TopPlayerCardsDeck from './TopPlayerCardsDeck';
import RightPlayerCardsDeck from './RightPlayerCardsDeck';
import BottomPlayerCardsDeck from './BottomPlayerCardsDeck';
import CenterTableCardsDeck from './CenterTableCardsDeck';
import socketIoClient from 'socket.io-client';
import removeIcon from './remove-icon.svg';
import suitClub from './suits/suit-club.svg';
import suitDiamond from './suits/suit-diamond.svg'
import suitHeart from './suits/suit-heart.svg'
import suitSpade from './suits/suit-spade.svg'
import './App.css';
import './index.css';
import './game.css';
const ENDPOINT = 'ws://' + window.location.hostname + ':3001';
const socket = socketIoClient.connect(ENDPOINT);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownLoginName: '',
      ownPlayerId: null,
      ownPlayingRoomId: null,
      ownChairId: null,
      ownCardsDeck: [],
      ownCurrentAction: 'none',
      ownRoomMaxPlayers: 2,
      ownRoomDurationTimeMins: 5,
      ownRoomDurationTimeSecs: 0,
      ownRoomLowestCard: 6,
      ownChatMessage: '',
      mobileChatBoxClass: 'hidden',
      chatBox: [],
      buttonPutCardDisabled: 'disabled',
      buttonSendChatMessageDisabled: 'disabled',
      loginContainerClass: 'hidden',
      rulesContainerClass: 'hidden',
      roomsContainerClass: 'hidden',
      customizeContainerClass: 'hidden',
      gameContainerClass: 'hidden',
      startGameAlertClass: 'hidden',
      tableStateInfoClass: 'hidden',  
      tableCenterClass: 'hidden',
      playersBarClass: 'hidden',
      bottomPlayerClass: 'hidden',
      topPlayerClass: 'hidden',
      rightPlayerClass: 'hidden',
      leftPlayerClass: 'hidden',
      loginAccess: {
        promptInfo: 'prompt-info hide',
        buttonLoginClass: 'hidden',
        buttonRulesClass: 'shown',
        buttonLoginDisabled: 'disabled',
        loginValid: false
      },
      tableCardsDeck: [],
      playersSides: [],
      playingPlayerId: null,
      currentSuit: 2,
      playingRooms: [],
      playersElapsedTime: []
    }
  }
  componentDidMount() {
    socket.on('playing-rooms', this.onPlayingRooms);
    socket.on('join-room', this.onJoinRoom);
    socket.on('chat-message', this.onChatMessage);
    socket.on('start-game-alert', this.onStartGameAlert);
    socket.on('start-game', this.onStartGame);
    socket.on('own-cards-deck', this.onOwnCardsDeck);
    setTimeout(() => {
      this.setState({loginContainerClass: 'showing'});
      document.getElementById('login-name').focus();
    }, 26000);
  }
  onPlayingRooms = (data) => {
    this.setState({playingRooms: data.playingRooms});
  }
  onJoinRoom = (data) => {
    this.setState({ownPlayerId: data.playerId});
  }
  onChatMessage = (data) => {
    let temp = this.state.chatBox;
    temp.push(data);
    this.setState({chatBox: [...temp]});
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
  }
  onStartGameAlert = () => {
    this.setState({startGameAlertClass: 'shown'});
  }
  onStartGame = (data) => {
    this.setState({playingRooms: data.playingRooms});
    this.setState({playersElapsedTime: data.playersElapsedTime});
    this.setState({startGameAlertClass: 'hidden'});
    this.replacePlayers();
  }
  onOwnCardsDeck = (data) => {
    this.setState({ownCardsDeck: [[2, 1, false], [3, 2, false], [1, 3, false]]});
    //this.setState({ownCardsDeck: data.ownCardsDeck});
  }
  updateLoginName = (loginName) => {
    this.setState({ownLoginName: loginName});
    let regex = /^(?!\-)[0-9a-zA-Z\-]+$/; // eslint-disable-line
    let valid = loginName.match(regex);
    if (valid) {
      if (loginName.length >= 3) {
        this.setState({loginAccess: {promptInfo: 'prompt-info hide', buttonLoginClass: 'shown', buttonRulesClass: 'hidden', buttonLoginDisabled: '', loginValid: true} });
      } else {
        this.setState({loginAccess: {promptInfo: 'prompt-info hide', buttonLoginClass: 'shown', buttonRulesClass: 'hidden', buttonLoginDisabled: 'disabled', loginValid: false} });
      }
    } else {
      if (loginName.length === 0) {
        this.setState({loginAccess: {promptInfo: 'prompt-info hide', buttonLoginClass: 'hidden', buttonRulesClass: 'shown', buttonLoginDisabled: 'disabled', loginValid: false} });
      } else {
        this.setState({loginAccess: {promptInfo: 'prompt-info shown', buttonLoginClass: 'shown', buttonRulesClass: 'hidden', buttonLoginDisabled: 'disabled', loginValid: false} });
      }
    }
  }
  updateChatMessage = (chatMessage) => {
    this.setState({ownChatMessage: chatMessage});
    if (chatMessage.length >= 1) {
      this.setState({buttonSendChatMessageDisabled: ''});
    } else {
      this.setState({buttonSendChatMessageDisabled: 'disabled'});
    }
  }
  loginUser = () => {
    if (this.state.loginAccess.loginValid === true) {
      socket.emit('login-user', {loginName: this.state.ownLoginName});
      this.setState({loginContainerClass: 'hiding'});
      setTimeout(() => {
        this.setState({loginContainerClass: 'hidden'});
      }, 2000);
      setTimeout(() => {
        this.setState({roomsContainerClass: 'showing'});
      }, 4000);
    }
  }
  sendChatMessage = () => {
    socket.emit('chat-message', {message: this.state.ownChatMessage, playingRoomId: this.state.ownPlayingRoomId});
    this.setState({ownChatMessage: ''});
  }
  inputKeyPressToLogin = (event) => {
    if(event.key === 'Enter'){
      this.loginUser();
    }
  }
  inputKeyPressToSendChatMessage = (event) => {
    if(event.key === 'Enter'){
      this.sendChatMessage();
    }
  }
  showRules = () => {
    this.setState({loginContainerClass: 'hiding'});
    setTimeout(() => {
      this.setState({loginContainerClass: 'hidden'});
    }, 2000);
    setTimeout(() => {
      this.setState({rulesContainerClass: 'showing'});
    }, 4000);
  }
  showLogin = () => {
    this.setState({rulesContainerClass: 'hiding'});
    setTimeout(() => {
      this.setState({rulesContainerClass: 'hidden'});
    }, 2000);
    setTimeout(() => {
      this.setState({loginContainerClass: 'showing'});
      document.getElementById('login-name').focus();
    }, 4000);
  }
  chooseRoom = (playingRoomId, stateClass) => {
    if (stateClass === 'playing') {
      alert('Nie możesz wejść do tego pokoju ponieważ aktualnie jest on zajęty przez innych graczy i toczy się w nim rozgrywka!')
    } else if (stateClass === 'preparing') {
      alert('Nie możesz narazie wejść do tego pokoju ponieważ jest on w trakcie przygotowywania!')
    } else if (stateClass === 'waiting') {
      if (this.state.ownPlayingRoomId === null) {
        this.setState({ownPlayingRoomId: playingRoomId});
        socket.emit('join-room', {playingRoomId: playingRoomId, loginName: this.state.ownLoginName});
        this.setState({roomsContainerClass: 'hiding'});
        setTimeout(() => {
          this.setState({roomsContainerClass: 'hidden'});
        }, 2000);
        setTimeout(() => {
          this.setState({gameContainerClass: 'showing'});
        }, 4000);
      }
    } else if (stateClass === 'ready') {
      if (this.state.ownPlayingRoomId === null) {
        this.setState({ownPlayingRoomId: playingRoomId});
        socket.emit('prepare-room', {playingRoomId: playingRoomId, loginName: this.state.ownLoginName});
        this.setState({roomsContainerClass: 'hiding'});
        setTimeout(() => {
          this.setState({roomsContainerClass: 'hidden'});
        }, 2000);
        setTimeout(() => {
          this.setState({customizeContainerClass: 'showing'});
        }, 4000);
      }
    }
  }
  openRoom = () => {
    socket.emit('create-room', {playingRoomId: this.state.ownPlayingRoomId, loginName: this.state.ownLoginName, roomMaxPlayers: this.state.ownRoomMaxPlayers, roomDurationTimeMins: this.state.ownRoomDurationTimeMins, roomDurationTimeSecs: this.state.ownRoomDurationTimeSecs, roomLowestCard: this.state.ownRoomLowestCard});
    this.setState({customizeContainerClass: 'hiding'});
    setTimeout(() => {
      this.setState({customizeContainerClass: 'hidden'});
    }, 2000);
    setTimeout(() => {
      this.setState({gameContainerClass: 'showing'});
    }, 4000);
  }
  returnToChooseRoom = () => {
    this.setState({customizeContainerClass: 'hiding'});
    setTimeout(() => {
      this.setState({customizeContainerClass: 'hidden'});
    }, 2000);
    setTimeout(() => {
      this.setState({roomsContainerClass: 'showing'});
    }, 4000);
  }
  sitDown = (chairId) =>  {
    this.setState({ownChairId: chairId});
    socket.emit('sit-down', {chairId: chairId, playingRoomId: this.state.ownPlayingRoomId});
  }
  replacePlayers= () => {
    let currentPlayersSides = [];
    let currentPlayerId;
    let currentChairId = this.state.ownChairId;
    let currentFreeChairs = this.state.playingRooms[this.state.ownPlayingRoomId].chairs.filter(chair => chair.playerId === 'not-available').length;
    for (let loop = 0; loop < 4; loop++) {
      currentPlayerId = this.state.playingRooms[this.state.ownPlayingRoomId].chairs.find(chair => chair.chairId === currentChairId).playerId;
      if (currentPlayerId !== 'not-available') {
        currentPlayersSides.push(currentPlayerId);
      }
      if (currentChairId === 3) {
        currentChairId = 0;
      } else {
        currentChairId++;
      }
    }
    this.setState({tableCenterClass: 'shown'});
    this.setState({tableStateInfoClass: 'shown'});
    this.setState({playersBarClass: 'shown'});
    if (currentFreeChairs === 0) {
      this.setState({playersSides: [
        {sideId: 0, sideName: 'bottom', playerId: currentPlayersSides[0]},
        {sideId: 1, sideName: 'left', playerId: currentPlayersSides[1]},
        {sideId: 2, sideName: 'top', playerId: currentPlayersSides[2]},
        {sideId: 3, sideName: 'right', playerId: currentPlayersSides[3]},
      ]});
      this.setState({bottomPlayerClass: 'shown'});
      this.setState({topPlayerClass: 'shown'});
      this.setState({leftPlayerClass: 'shown'});
      this.setState({rightPlayerClass: 'shown'});
    } else if (currentFreeChairs === 1) {
      this.setState({playersSides: [
        {sideId: 0, sideName: 'bottom', playerId: currentPlayersSides[0]},
        {sideId: 1, sideName: 'left', playerId: currentPlayersSides[1]},
        {sideId: 2, sideName: 'top', playerId: 'none'},
        {sideId: 3, sideName: 'right', playerId: currentPlayersSides[2]},
      ]});
      this.setState({bottomPlayerClass: 'shown'});
      this.setState({leftPlayerClass: 'shown'});
      this.setState({rightPlayerClass: 'shown'});
    } else if (currentFreeChairs === 2) {
      this.setState({playersSides: [
        {sideId: 0, sideName: 'bottom', playerId: currentPlayersSides[0]},
        {sideId: 1, sideName: 'left', playerId: 'none'},
        {sideId: 2, sideName: 'top', playerId: currentPlayersSides[1]},
        {sideId: 3, sideName: 'right', playerId: 'none'},
      ]});
      this.setState({bottomPlayerClass: 'shown'});
      this.setState({topPlayerClass: 'shown'});
    }
    this.setState({startGameAlertClass: 'hidden'});
  }
  selectCard = (cardId) => {
    let cardFigure;
    let cardSuit;
    let cardsDeck = [];
    let selectedCardState = this.state.ownCardsDeck[cardId][2];
    let currentSelectedCardState = false;
    for (let loop = 0; loop < this.state.ownCardsDeck.length; loop++) {
      cardFigure = this.state.ownCardsDeck[loop][0];
      cardSuit = this.state.ownCardsDeck[loop][1];
      if (loop === cardId) {
        cardsDeck.push([cardFigure, cardSuit, !selectedCardState]);
        if (!selectedCardState) {
          currentSelectedCardState = true;
        }
      } else {
        cardsDeck.push([cardFigure, cardSuit, false]);
      }
    }
    if (currentSelectedCardState) {
      if (this.state.ownCurrentAction === 'defense') {
        if ((cardsDeck[cardId][0] > this.state.tableCardsDeck[this.state.tableCardsDeck.length - 1][0] && cardsDeck[cardId][1] === this.state.tableCardsDeck[this.state.tableCardsDeck.length - 1][1]) || (this.state.tableCardsDeck[this.state.tableCardsDeck.length - 1][1] !== this.state.currentSuit && cardsDeck[cardId][1] === this.state.currentSuit)) {
          if (this.state.playingPlayerId === this.state.ownPlayerId) {
            this.setState({buttonPutCardDisabled: ''});
          }
        } else {
          this.setState({buttonPutCardDisabled: 'disabled'});
        }
      } else if (this.state.ownCurrentAction === 'addition') {
        if (this.state.tableCardsDeck.some(item => item[0] === cardsDeck[cardId][0])) {
          if (this.state.playingPlayerId === this.state.ownPlayerId) {
            this.setState({buttonPutCardDisabled: ''});
          }
        } else {
          this.setState({buttonPutCardDisabled: 'disabled'});
        }
      } else if (this.state.ownCurrentAction === 'attack') {
        if (this.state.playingPlayerId === this.state.ownPlayerId) {
          this.setState({buttonPutCardDisabled: ''});
        }
      }
    } else {
      this.setState({buttonPutCardDisabled: 'disabled'});
    }
    this.setState({ownCardsDeck: cardsDeck});
  }
  startGame = () => {
    socket.emit('start-game', {playingRoomId: this.state.ownPlayingRoomId});
  }
  render() {
    return (
      <div className="App">
        <p className="copyright-text"></p>
        <p className="welcome-text"></p>
        <div id="login-container" className={this.state.loginContainerClass}>
          <p>Podaj swój login:</p>
          <input type="text" id="login-name" name="login-name" maxLength="7" autoComplete="off" value={this.state.ownLoginName} onChange={e => this.updateLoginName(e.target.value)} onKeyPress={this.inputKeyPressToLogin} />
          <button type="button" className={this.state.loginAccess.buttonLoginClass} onClick={this.loginUser} disabled={this.state.loginAccess.buttonLoginDisabled}>Zaloguj się!</button>
          <button type="button" className={this.state.loginAccess.buttonRulesClass} onClick={this.showRules}>Wyjaśnij mi zasady gry!</button>
          <p className={this.state.loginAccess.promptInfo}>Dopuszczalne są tylko litery od A do Z,<br />cyfry od 0 do 9 oraz znak minus!</p>
        </div>
        <div id="rules-container" className={this.state.rulesContainerClass}>
          <p>Zasady gry w karty w&nbsp;durnia:</p>
          <Rules />
          <button type="button" onClick={this.showLogin}>OK, rozumiem!</button>
        </div>
        <div id="rooms-container" className={this.state.roomsContainerClass}>
          <p>Wybierz pokój do gry:</p>
          <div>
            {this.state.playingRooms.map(playingRoom =>
              <div key={playingRoom.playingRoomId} className={playingRoom.stateClass} onClick={e => this.chooseRoom(playingRoom.playingRoomId, playingRoom.stateClass)}>
                <small data-room-id={(playingRoom.playingRoomId + 1)}></small>
                <div>
                  <div>{(playingRoom.playingRoomId + 1)}</div>
                  <div>
                    <span>Stan: {playingRoom.stateName}</span>
                    <span>Gracze: {((playingRoom.stateClass !== 'ready' && playingRoom.stateClass !== 'preparing') ? playingRoom.players.map(player => <span key={player.playerId} className="players-text">{player.loginName}</span>) : 'żadnych')}</span>
                    <span>Oczekiwana ilość graczy: {((playingRoom.stateClass !== 'ready' && playingRoom.stateClass !== 'preparing') ? playingRoom.maxPlayers : 'nieustalona')}</span>
                    <span>Czas dla gracza: {((playingRoom.stateClass !== 'ready' && playingRoom.stateClass !== 'preparing') ? (Math.floor(playingRoom.durationTime / 60) + ' min. ' + ((playingRoom.durationTime % 60) >= 10 ? (Math.floor(playingRoom.durationTime % 60)) : ('0' + Math.floor(playingRoom.durationTime % 60))) + ' sek.') : 'nieokreślony')}</span>
                    <span>Najniższa karta w talii: {((playingRoom.stateClass !== 'ready' && playingRoom.stateClass !== 'preparing') ? playingRoom.lowestCard : 'nieokreślona')}</span>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
        <div id="customize-container" className={this.state.customizeContainerClass}>
          <p>Dostosuj nowy pokój:</p>
          <div>
            <div>
              <big data-room-id={this.state.ownPlayingRoomId}></big>
              <div>
                <div>
                  <span>Administrator:</span>
                  <input type="text" id="admin-name" name="admin-name" value={this.state.ownLoginName} disabled />
                </div>
                <div>
                  <span>Oczekiwana ilość graczy:</span>
                  <select id="players-amount" name="players-amount" value={this.state.ownRoomMaxPlayers} onChange={e => this.setOwnRoomMaxPlayers(e.target.value)}>
                    <option value="2">2 &ndash; dwóch graczy</option>
                    <option value="3">3 &ndash; trzech graczy</option>
                    <option value="4">4 &ndash; czterech graczy</option>
                  </select>
                </div>
                <div>
                  <span>Całkowity czas dla gracza:</span>
                  <input type="number" id="duration-time-mins" name="duration-time-mins" value={this.state.ownRoomDurationTimeMins} min="1" max="15" step="1" onChange={e => this.setOwnRoomDurationTimeMins(e.target.value)} />
                  <span className="mins-label">min.</span>
                  <input type="number" id="duration-time-secs" name="duration-time-secs" value={this.state.ownRoomDurationTimeSecs} min="0" max="59" step="1" onChange={e => this.setOwnRoomDurationTimeSecs(e.target.value)} />
                  <span className="secs-label">sek.</span>
                </div>
                <div>
                  <span>Najniższa karta w talii:</span>
                  <select id="lowest-card" name="lowest-card" value={this.state.ownRoomLowestCard} onChange={e => this.setOwnRoomLowestCard(e.target.value)}>
                    <option value="2">2 &ndash; dwójka</option>
                    <option value="3">3 &ndash; trójka</option>
                    <option value="4">4 &ndash; czwórka</option>
                    <option value="5">5 &ndash; piątka</option>
                    <option value="6">6 &ndash; szóstka</option>
                  </select>
                </div>
              </div>
              <hr />
              <button type="button" onClick={this.openRoom}>Otwórz nowy pokój!</button>
              <button type="button" onClick={this.returnToChooseRoom}>Przejdź do poprzedniej strony!</button>
            </div>
          </div>
        </div>
        <div id="game-container" className={this.state.gameContainerClass}>
          <div>
            <div id="table">
              <div id="start-game-alert" className={this.state.startGameAlertClass}>{(this.state.ownPlayerId !== 2) ? 'Czekaj na potwierdzenie i\u00A0rozpoczęcie gry przez administratora' : 'Wszystkie krzesła zostały zajęte.\nCzy chcesz rozpocząć grę w\u00A0obecnym składzie?'}{(this.state.ownPlayerId === 2) ? <button type="button" onClick={this.startGame}>Tak, rozpocznijmy grę!</button> : null}</div>
              <div id="table-state-info" className={this.state.tableStateInfoClass}>Atut: {(this.state.currentSuit === 0) ? <img src={suitSpade} alt="Ikona przedstawiająca obowiązujący atut pik" title="Atut o kolorze pik" /> : (this.state.currentSuit === 1) ? <img src={suitHeart} alt="Ikona przedstawiająca obowiązujący atut kier" title="Atut o kolorze kier" /> : (this.state.currentSuit === 2) ? <img src={suitClub} alt="Ikona przedstawiająca obowiązujący atut trefl" title="Atut o kolorze trefl" /> : (this.state.currentSuit === 3) ? <img src={suitDiamond} alt="Ikona przedstawiająca obowiązujący atut karo" title="Atut o kolorze karo" /> : null}<br />Na stole: {this.state.tableCardsDeck.length}<br />Pozostało: 16</div>
              <div id="table-center" className={this.state.tableCenterClass}>
                <div className="table-cards-deck">
                  {this.state.tableCardsDeck.map((centerCard, centerCardIndex) => <CenterTableCardsDeck key={'center-card-' + centerCardIndex} centerCard={centerCard} centerCardIndex={centerCardIndex} />)}
                </div>
              </div>
              <div id="players-bar" className={this.state.playersBarClass}>
                <LeftPlayerStatus leftPlayerClass={this.state.leftPlayerClass} ownPlayingRoomId={this.state.ownPlayingRoomId} playingRooms={this.state.playingRooms} playersElapsedTime={this.state.playersElapsedTime} playersSides={this.state.playersSides} playingPlayerId={this.state.playingPlayerId} />
                <TopPlayerStatus topPlayerClass={this.state.topPlayerClass} ownPlayingRoomId={this.state.ownPlayingRoomId} playingRooms={this.state.playingRooms} playersElapsedTime={this.state.playersElapsedTime} playersSides={this.state.playersSides} playingPlayerId={this.state.playingPlayerId} />
                <RightPlayerStatus rightPlayerClass={this.state.rightPlayerClass} ownPlayingRoomId={this.state.ownPlayingRoomId} playingRooms={this.state.playingRooms} playersElapsedTime={this.state.playersElapsedTime} playersSides={this.state.playersSides} playingPlayerId={this.state.playingPlayerId} />
              </div>
              <div id="player-bottom" className={this.state.bottomPlayerClass}>
                <div className="players-status">
                  <BottomPlayerStatus bottomPlayerClass={this.state.bottomPlayerClass} ownPlayingRoomId={this.state.ownPlayingRoomId} playingRooms={this.state.playingRooms} playersElapsedTime={this.state.playersElapsedTime} playersSides={this.state.playersSides} playingPlayerId={this.state.playingPlayerId} />
                </div>
                <div className="players-cards-deck">
                  {this.state.ownCardsDeck && this.state.ownCardsDeck.map((bottomCard, bottomCardIndex) => <BottomPlayerCardsDeck key={'bottom-card-' + bottomCardIndex} bottomCard={bottomCard} bottomCardIndex={bottomCardIndex} onClick={() => this.selectCard(bottomCardIndex)} />)}
                </div>
              </div>
              <div id="player-left" className={this.state.leftPlayerClass}>
              <div className="players-status">
                <LeftPlayerStatus leftPlayerClass={this.state.leftPlayerClass} ownPlayingRoomId={this.state.ownPlayingRoomId} playingRooms={this.state.playingRooms} playersElapsedTime={this.state.playersElapsedTime} playersSides={this.state.playersSides} playingPlayerId={this.state.playingPlayerId} />
              </div>
              <div className="players-cards-deck">
                <LeftPlayerCardsDeck leftPlayerClass={this.state.leftPlayerClass} ownPlayingRoomId={this.state.ownPlayingRoomId} playingRooms={this.state.playingRooms} playersSides={this.state.playersSides} />
              </div>
              </div>
              <div id="player-top" className={this.state.topPlayerClass}>
              <div className="players-status">
                <TopPlayerStatus topPlayerClass={this.state.topPlayerClass} ownPlayingRoomId={this.state.ownPlayingRoomId} playingRooms={this.state.playingRooms} playersElapsedTime={this.state.playersElapsedTime} playersSides={this.state.playersSides} playingPlayerId={this.state.playingPlayerId} />
              </div>
              <div className="players-cards-deck">
                <TopPlayerCardsDeck topPlayerClass={this.state.topPlayerClass} ownPlayingRoomId={this.state.ownPlayingRoomId} playingRooms={this.state.playingRooms} playersSides={this.state.playersSides} />
              </div>
              </div>
              <div id="player-right" className={this.state.rightPlayerClass}>
              <div className="players-status">
                <RightPlayerStatus rightPlayerClass={this.state.rightPlayerClass} ownPlayingRoomId={this.state.ownPlayingRoomId} playingRooms={this.state.playingRooms} playersElapsedTime={this.state.playersElapsedTime} playersSides={this.state.playersSides} playingPlayerId={this.state.playingPlayerId} />
              </div>
              <div className="players-cards-deck">
                <RightPlayerCardsDeck rightPlayerClass={this.state.rightPlayerClass} ownPlayingRoomId={this.state.ownPlayingRoomId} playingRooms={this.state.playingRooms} playersSides={this.state.playersSides} />
              </div>
              </div>
            </div>
            <div id="aside">
              <div id="chairs">
              {(typeof this.state.playingRooms[this.state.ownPlayingRoomId] !=='undefined') ? this.state.playingRooms[this.state.ownPlayingRoomId].chairs.map(chair =>
                <div key={'chair-' + chair.chairId} className="chair">
                  <div>Krzesło {(chair.chairId + 1)}</div>
                  <div>{(chair.playerId === 'not-available') ? <span className="chair-not-available">Niedostępne</span> : ((chair.playerId === 'not-assigned' && this.state.ownChairId === null) ? <button type="button" onClick={() => this.sitDown(chair.chairId)}>Usiądź</button> : ((chair.playerId === 'not-assigned' && this.state.ownChairId !== null) ? <span className="chair-waiting">Oczekuje</span> : <span className="chair-busy">{this.state.playingRooms[this.state.ownPlayingRoomId].players.find(player => player.playerId === chair.playerId).loginName}{(this.state.ownPlayerId === 2) ? <img className="remove-icon" src={removeIcon} alt="Przycisk do wyproszenia gracza" title="Wyproś tego gracza z pokoju" /> : null}</span>))}</div>
                </div>) : null
              }
              </div>
              <div id="actions">
                <div className="actions">
                  <div>Wykonaj akcję</div>
                  <div>
                    <button type="button" disabled={this.state.buttonPutCardDisabled}>Połóż</button>
                    <button type="button" disabled={(this.state.playingPlayerId === this.state.ownPlayerId && this.state.ownCurrentAction === 'defense') ? '' : 'disabled'}>Zabierz</button>
                    <button type="button" disabled={(this.state.playingPlayerId === this.state.ownPlayerId && this.state.ownCurrentAction === 'addition') ? '' : 'disabled'}>Spasuj</button>
                    <button type="button" onClick={e => (this.state.mobileChatBoxClass === 'shown') ? this.setState({mobileChatBoxClass: 'hidden'}) : this.setState({mobileChatBoxClass: 'shown'})}>{(this.state.mobileChatBoxClass === 'shown') ? 'Ukryj czat' : 'Pokaż czat'}</button>
                  </div>
                </div>
              </div>
              <div id="chat" className={this.state.mobileChatBoxClass}>
                <div className="chat">
                  <div>Czat grupowy</div>
                  <div>
                    <div id="chat-box">{this.state.chatBox.map((message, messageIndex) => <div key={'chat-' + messageIndex} title={'Czas nadania: ' + message.addTime}><strong>{message.loginName}:</strong> {message.message}</div>)}
                    </div>
                    <div>
                      <input type="text" id="chat-message" name="chat-message" autoComplete="off" size="1" maxLength="100" value={this.state.ownChatMessage} onChange={e => this.updateChatMessage(e.target.value)} onKeyPress={this.inputKeyPressToSendChatMessage} />
                      <button type="button" onClick={this.sendChatMessage} disabled={this.state.buttonSendChatMessageDisabled}>Wyślij</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}