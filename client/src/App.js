import React, { useState, useEffect } from 'react';
import socketIoClient from 'socket.io-client';
import removeIcon from './remove-icon.svg';
import arrow from './arrow.svg';
import cards from './cards'
import './App.css';
import './index.css';
import './game.css';
const ENDPOINT = 'ws://127.0.0.1:3001';
const socket = socketIoClient.connect(ENDPOINT);

function App() {
  const [ownLoginName, setOwnLoginName] = useState('one');
  const [ownPlayerId, setOwnPlayerId] = useState(2);
  const [ownChairId, setOwnChairId] = useState(3);
  const [ownPlayingRoomId, setOwnPlayingRoomId] = useState(0);
  const [ownCardsDeck, setOwnCardsDeck] = useState([[2, 1], [1, 3], [8, 2], [6, 2], [4, 1], [12, 3], [2, 1]]);
  const [ownRoomMaxPlayers, setOwnRoomMaxPlayers] = useState(2);
  const [ownRoomDurationTimeMins, setOwnRoomDurationTimeMins] = useState(5);
  const [ownRoomDurationTimeSecs, setOwnRoomDurationTimeSecs] = useState(0);
  const [ownRoomLowestCard, setOwnRoomLowestCard] = useState(6);
  const [ownChatMessage, setOwnChatMessage] = useState('');
  const [chatBox, setChatBox] = useState([]);
  const [buttonSendChatMessageDisabled, setButtonSendChatMessageDisabled] = useState('disabled');
  const [loginContainerClass, setLoginContainerClass] = useState('hidden');
  const [rulesContainerClass, setRulesContainerClass] = useState('hidden');
  const [roomsContainerClass, setRoomsContainerClass] = useState('hidden');
  const [customizeContainerClass, setCustomizeContainerClass] = useState('hidden');
  const [gameContainerClass, setGameContainerClass] = useState('shown');
  const [startGameAlertClass, setStartGameAlertClass] = useState('shown');
  const [playerBottomClass, setPlayerBottomClass] = useState('hidden');
  const [playerTopClass, setPlayerTopClass] = useState('hidden');
  const [playerRightClass, setPlayerRightClass] = useState('hidden');
  const [playerLeftClass, setPlayerLeftClass] = useState('hidden');
  const [loginAccess, setLoginAccess] = useState({
    promptInfo: 'prompt-info hide',
    buttonLoginClass: 'hidden',
    buttonRulesClass: 'shown',
    buttonLoginDisabled: 'disabled',
    loginValid: false
  });
  const [playersSides, setPlayersSides] = useState([]);
  const [playingPlayerId, setPlayingPlayerId] = useState(3);
  const [playingRooms, setPlayingRooms] = useState([{
  	playingRoomId: 0,
  	stateClass: 'waiting',
  	stateName: 'Oczekuje na graczy',
  	maxPlayers: 3,
  	chairs: [
      {chairId: 0, playerId: 3},
      {chairId: 1, playerId: 1},
      {chairId: 2, playerId: 0},
      {chairId: 3, playerId: 2}
    ],
  	players: [
  		{
  			socketId: 9,
  			playerId: 2,
  			loginName: 'one',
        cardsAmount: 7
  		},
  		{
  			socketId: 3,
  			playerId: 1,
  			loginName: 'two',
        cardsAmount: 6
  		},
      {
        socketId: 5,
        playerId: 0,
        loginName: 'three',
        cardsAmount: 8
      },
      {
        socketId: 7,
        playerId: 3,
        loginName: 'four',
        cardsAmount: 4
      }],
  	durationTime: 621,
  	lowestCard: 6
  }]);
  const [playersElapsedTime, setPlayersElapsedTime] = useState([
    {
      playerId: 1, time: 400
    },
    {
      playerId: 2, time: 600
    },
    {
      playerId: 0, time: 500
    },
    {
      playerId: 3, time: 800
    }
  ]);
  useEffect(() => {
    socket.on('playing-rooms', (data) => {
      setPlayingRooms(data.playingRooms);
    });
    socket.on('join-room', (data) => {
      setOwnPlayerId(data.playerId);
    });
    socket.on('chat-message', (data) => {
      let temp = chatBox;
      temp.push(data);
      setChatBox([...temp]);
      document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    });
    socket.on('start-game-alert', () => {
      setStartGameAlertClass('shown');
    });
    socket.on('start-game', () => {
      setStartGameAlertClass('hidden');
      setOwnCardsDeck([[2, 1], [1, 3], [7, 2], [9, 1], [6, 0], [5, 2]]);
    });
    /*setTimeout(function() {
      setLoginContainerClass('showing');
      document.getElementById('login-name').focus();
    }, 26000);*/
  }, []);
  function updateLoginName(loginName) {
    setOwnLoginName(loginName);
    let regex = /^(?!\-)[0-9a-zA-Z\-]+$/; // eslint-disable-line
    let valid = loginName.match(regex);
    if (valid) {
      if (loginName.length >= 3) {
        setLoginAccess( {promptInfo: 'prompt-info hide', buttonLoginClass: 'shown', buttonRulesClass: 'hidden', buttonLoginDisabled: '', loginValid: true} );
      } else {
        setLoginAccess( {promptInfo: 'prompt-info hide', buttonLoginClass: 'shown', buttonRulesClass: 'hidden', buttonLoginDisabled: 'disabled', loginValid: false} );
      }
    } else {
      if (loginName.length === 0) {
        setLoginAccess( {promptInfo: 'prompt-info hide', buttonLoginClass: 'hidden', buttonRulesClass: 'shown', buttonLoginDisabled: 'disabled', loginValid: false} );
      } else {
        setLoginAccess( {promptInfo: 'prompt-info shown', buttonLoginClass: 'shown', buttonRulesClass: 'hidden', buttonLoginDisabled: 'disabled', loginValid: false} );
      }
    }
  }
  function updateChatMessage(chatMessage) {
    setOwnChatMessage(chatMessage);
    if (chatMessage.length >= 1) {
      setButtonSendChatMessageDisabled('');
    } else {
      setButtonSendChatMessageDisabled(' disabled');
    }
  }
  function loginUser() {
    if (loginAccess.loginValid === true) {
      socket.emit('login-user', {loginName: ownLoginName});
      setLoginContainerClass('hiding');
      setTimeout(function() {
        setLoginContainerClass('hidden');
      }, 2000);
      setTimeout(function() {
        setRoomsContainerClass('showing');
      }, 4000);
    }
  }
  function sendChatMessage() {
    socket.emit('chat-message', {message: ownChatMessage, playingRoomId: ownPlayingRoomId});
    setOwnChatMessage('');
  }
  function inputKeyPressToLogin(event) {
    if(event.key === 'Enter'){
      loginUser();
    }
  }
  function inputKeyPressToSendChatMessage(event) {
    if(event.key === 'Enter'){
      sendChatMessage();
    }
  }
  function showRules() {
    setLoginContainerClass('hiding');
    setTimeout(function() {
      setLoginContainerClass('hidden');
    }, 2000);
    setTimeout(function() {
      setRulesContainerClass('showing');
    }, 4000);
  }
  function showLogin() {
    setRulesContainerClass('hiding');
    setTimeout(function() {
      setRulesContainerClass('hidden');
    }, 2000);
    setTimeout(function() {
      setLoginContainerClass('showing');
      document.getElementById('login-name').focus();
    }, 4000);
  }
  function chooseRoom(playingRoomId, stateClass) {
    if (stateClass === 'playing') {
      alert('Nie możesz wejść do tego pokoju ponieważ aktualnie jest on zajęty przez innych graczy i toczy się w nim rozgrywka!')
    } else if (stateClass === 'preparing') {
      alert('Nie możesz narazie wejść do tego pokoju ponieważ jest on w trakcie przygotowywania!')
    } else if (stateClass === 'waiting') {
      if (ownPlayingRoomId === null) {
        setOwnPlayingRoomId(playingRoomId);
        socket.emit('join-room', {playingRoomId: playingRoomId, loginName: ownLoginName});
        setRoomsContainerClass('hiding');
        setTimeout(function() {
          setRoomsContainerClass('hidden');
        }, 2000);
        setTimeout(function() {
          setGameContainerClass('showing');
        }, 4000);
      }
    } else if (stateClass === 'ready') {
      if (ownPlayingRoomId === null) {
        setOwnPlayingRoomId(playingRoomId);
        socket.emit('prepare-room', {playingRoomId: playingRoomId, loginName: ownLoginName});
        setRoomsContainerClass('hiding');
        setTimeout(function() {
          setRoomsContainerClass('hidden');
        }, 2000);
        setTimeout(function() {
          setCustomizeContainerClass('showing');
        }, 4000);
      }
    }
  }
  function openRoom() {
    socket.emit('create-room', {playingRoomId: ownPlayingRoomId, loginName: ownLoginName, roomMaxPlayers: ownRoomMaxPlayers, roomDurationTimeMins: ownRoomDurationTimeMins, roomDurationTimeSecs: ownRoomDurationTimeSecs, roomLowestCard: ownRoomLowestCard});
    setCustomizeContainerClass('hiding');
    setTimeout(function() {
      setCustomizeContainerClass('hidden');
    }, 2000);
    setTimeout(function() {
      setGameContainerClass('showing');
    }, 4000);
  }
  function returnToChooseRoom() {
    setCustomizeContainerClass('hiding');
    setTimeout(function() {
      setCustomizeContainerClass('hidden');
    }, 2000);
    setTimeout(function() {
      setRoomsContainerClass('showing');
    }, 4000);
  }
  function sitDown(chairId) {
    setOwnChairId(chairId);
    socket.emit('sit-down', {chairId: chairId, playingRoomId: ownPlayingRoomId});
  }
  function startGame() {
    let currentPlayersSides = [];
    let currentPlayerId;
    let currentChairId = ownChairId;
    let currentFreeChairs = playingRooms[ownPlayingRoomId].chairs.filter(chair => chair.playerId === 'not-available').length;
    for (let loop = 0; loop < 4; loop++) {
      currentPlayerId = playingRooms[ownPlayingRoomId].chairs.find(chair => chair.chairId === currentChairId).playerId;
      if (currentPlayerId !== 'not-available') {
        currentPlayersSides.push(currentPlayerId);
      }
      if (currentChairId === 3) {
        currentChairId = 0;
      } else {
        currentChairId++;
      }
    }
    if (currentFreeChairs === 0) {
      setPlayersSides([
        {sideId: 0, sideName: 'bottom', playerId: currentPlayersSides[0]},
        {sideId: 1, sideName: 'left', playerId: currentPlayersSides[1]},
        {sideId: 2, sideName: 'top', playerId: currentPlayersSides[2]},
        {sideId: 3, sideName: 'right', playerId: currentPlayersSides[3]},
      ]);
      setPlayerBottomClass('shown');
      setPlayerTopClass('shown');
      setPlayerLeftClass('shown');
      setPlayerRightClass('shown');
    } else if (currentFreeChairs === 1) {
      setPlayersSides([
        {sideId: 0, sideName: 'bottom', playerId: currentPlayersSides[0]},
        {sideId: 1, sideName: 'left', playerId: currentPlayersSides[1]},
        {sideId: 2, sideName: 'top', playerId: 'none'},
        {sideId: 3, sideName: 'right', playerId: currentPlayersSides[2]},
      ]);
      setPlayerBottomClass('shown');
      setPlayerLeftClass('shown');
      setPlayerRightClass('shown');
    } else if (currentFreeChairs === 2) {
      setPlayersSides([
        {sideId: 0, sideName: 'bottom', playerId: currentPlayersSides[0]},
        {sideId: 1, sideName: 'left', playerId: 'none'},
        {sideId: 2, sideName: 'top', playerId: currentPlayersSides[1]},
        {sideId: 3, sideName: 'right', playerId: 'none'},
      ]);
      setPlayerBottomClass('shown');
      setPlayerTopClass('shown');
    }
    socket.emit('start-game', {playingRoomId: ownPlayingRoomId});
  }
  function generateBottomCardDeck() {
    let temp = [];
    let amount = ownCardsDeck.length;
    for (let loop = 0; loop < amount; loop++) {
      let cardFigure =  ownCardsDeck[loop][0];
      let cardColor = ownCardsDeck[loop][1];
      temp.push(<img key={'bottom-card-' + loop} src={cards[cardFigure][cardColor].src} title={cards[cardFigure][cardColor].title} style={{ transform: 'translateX(' + (loop * 35) + '%)'}} />);
    }
    return temp;
  }
  function generateTopCardDeck() {
    let temp = [];
    let amount = (playerTopClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'top').playerId).cardsAmount : 0;
    for (let loop = 0; loop < amount; loop++) {
      temp.push(<img key={'top-card-' + loop} src={cards[0][0].src} title={cards[0][0].title} style={{ transform: 'translateX(' + (loop * 35) + '%)'}} />);
    }
    return temp;
  }
  function generateLeftCardDeck() {
    let temp = [];
    let amount = (playerLeftClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'left').playerId).cardsAmount : 0;
    for (let loop = 0; loop < amount; loop++) {
      temp.push(<img key={'left-card-' + loop} src={cards[0][0].src} title={cards[0][0].title} style={{ transform: 'translate(-50%, ' + (loop * 35 * 2 / 3) + '%) rotate(90deg)'}} />);
    }
    return temp;
  }
  function generateRightCardDeck() {
    let temp = [];
    let amount = (playerRightClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'right').playerId).cardsAmount : 0;
    for (let loop = 0; loop < amount; loop++) {
      temp.push(<img key={'right-card-' + loop} src={cards[0][0].src} title={cards[0][0].title} style={{ transform: 'translate(-50%, ' + (loop * 35 * 2 / 3) + '%) rotate(90deg)'}} />);
    }
    return temp;
  }
  return (
    <div className="App">
      <p className="copyright-text"></p>
      <p className="welcome-text"></p>
      <div id="login-container" className={loginContainerClass}>
        <p>Podaj swój login:</p>
        <input type="text" id="login-name" name="login-name" maxLength="5" autoComplete="off" value={ownLoginName} onChange={e => updateLoginName(e.target.value)} onKeyPress={inputKeyPressToLogin} />
        <button type="button" className={loginAccess.buttonLoginClass} onClick={loginUser} disabled={loginAccess.buttonLoginDisabled}>Zaloguj się!</button>
        <button type="button" className={loginAccess.buttonRulesClass} onClick={showRules}>Wyjaśnij mi zasady gry!</button>
        <p className={loginAccess.promptInfo}>Dopuszczalne są tylko litery od A do Z,<br />cyfry od 0 do 9 oraz znak minus!</p>
      </div>
      <div id="rules-container" className={rulesContainerClass}>
        <p>Zasady gry w karty w&nbsp;durnia:</p>
        <div>
          <p>Gra w&nbsp;karty pod nazwą &bdquo;dureń&rdquo; wydaje się być najpopularniejszą grą karcianą w&nbsp;Rosji. Nie jest przesadą twierdzenie, że każdy rosyjski gracz w&nbsp;karty zna tą grę. Durniem w grze pozostaje przegrany &ndash; gracz, któremu zostały karty gdy pozostali się ich pozbyli. Można grać w dowolną liczbę osób od dwóch do sześciu, grając indywidualnie bądź w&nbsp;zespołach po dwóch lub trzech graczy siedzących na przemian. Gra się 36&nbsp;kartami, karty w każdym kolorze (tj. pik, kier, karo, trefl), siła kart od najwyższej do najniższej: as, król, dama, walet, 10, 9, 8, 7, 6.</p>
          <p>Na początku, rozdający tasuje i&nbsp;rozdaje każdemu graczowi po sześć zakrytych kart. Następnie odsłania się jedną kartę, jej kolor jest atutem. Pozostałe nierozdane karty (nazywane stosem) kładzie się zakryte na górze karty atutowej. Gracze podnoszą swoje karty i&nbsp;oglądają je. Grę zaczyna gracz siedzący na lewo od rozdającego.</p>
          <p>Gra składa się z serii ataków. Podczas ataku jest atakujący (któremu mogą pomagać inni sprzymierzeni gracze) oraz obrońca (który broni się sam). Atakujący zaczyna poprzez zagranie karty na stół przed obrońcę. Obrońca próbuje odeprzeć atak poprzez zakrycie jej kartą wyższą. Karta atakująca, która nie jest atutem może zostać pobita kartą wyższą tego samego koloru, lub dowolnym atutem. Karta atutowa może być pobita jedynie poprzez zagranie wyższego atutu. Należy zauważyć, że karta nieatutowa może zawsze zostać pobita jakimkolwiek atutem.</p>
          <p>Jeśli obrońca odeprze pierwszy atak, atakujący może go kontynuować poprzez zagranie kolejnej karty. Również inni przeciwnicy obrońcy (gracze sprzymierzeni z&nbsp;atakującym) mogą dołączyć się do ataku, jeśli mają odpowiednie karty. Jednak główny atakujący ma zawsze pierwszeństwo &ndash; inni mogą dołączyć się jedynie za jego zgodą. Każda nowa dokładana karta atakująca musi być o&nbsp;tej samej figurze co karty dotychczas zagrane podczas ataku, zarówno przez atakującego jak i&nbsp;obrońcę. Ponadto, całkowita liczba kart zagranych przez atakujących podczas ataku nie może przekroczyć sześciu. Jeśli obrońca przed atakiem ma mniej niż sześć kart, liczba kart zagranych przez atakujących nie może być większa niż liczba kart w&nbsp;ręce obrońcy. Obrońca odpiera cały atak gdy pobije wszystkie karty atakujące (maksymalnie sześć) zagrane dotychczas oraz żaden z&nbsp;przeciwników nie może lub nie chce kontynuować ataku lub obrońca nie posiada żadnych kart na ręce i&nbsp;wszystkie jego karty zostały użyte do odparcia ataku. Kiedy atak zostaje odparty, wszystkie karty zagrane w nim (karty atakujące i&nbsp;broniące) zostają odłożone na osobny stos i&nbsp;nie biorą już udziału w tym rozdaniu. Obrońca zostaje atakującym, a&nbsp;gracz na lewo nowym obrońcą.</p>
          <p>Jeśli obrońca nie może lub nie chce pobić karty atakującej, podnosi ją i&nbsp;staje się częścią ręki obrońcy &ndash; w&nbsp;tym wypadku atak się powiódł i&nbsp;obrońca nie zostaje atakującym. Następnym atakującym jest gracz po lewej od obrońcy a&nbsp;następnym obrońcą gracz po lewej od nowego atakującego.</p>
          <p>Po zakończeniu ataku, wszyscy gracze którzy mają mniej niż sześć kart muszą uzupełnić swoje ręce do sześciu poprzez pobranie odpowiedniej ilości kart ze stosu. Najpierw dobiera atakujący, później inni gracze, którzy brali udział w&nbsp;ataku w&nbsp;kolejności zgodnej z&nbsp;ruchem wskazówek zegara a&nbsp;na końcu obrońca. Jeśli nie ma wystarczającej ilości kart w&nbsp;stosie, karty pobierane są jak zwykle aż do momentu wyczerpania stosu. Może się zdarzyć, że późniejsi gracze nie pobiorą żadnych kart. Ostatni atut (odkryty) jest pobierany jako ostatnia karta ze stosu. Po wyczerpaniu stosu gra jest kontynuowana bez dobierania.</p>
          <p>Generalny kierunek gry jest zgodny z&nbsp;ruchem wskazówek zegara. Jeśli atak zostaje odparty, obrońca staje się atakującym a&nbsp;następny gracz w kolejności nowym obrońcą. Jeśli atak się udaje, obrońca nie zostaje atakującym. Nowym atakującym jest następny gracz w&nbsp;kolejności po obrońcy, a&nbsp;nowym obrońcą gracz po lewej od nowego atakującego. Kiedy gracze pozbywają się kart, odpadają z rozgrywki a&nbsp;pozostali kontynuują. Wygrywa gracz, który pierwszy pozbędzie się kart, chyba że przedostatnia karta zostanie pobita &ndash; wtedy jest rozegrane. &bdquo;Durniem&rdquo; zostaje gracz, któremu pozostały karty na ręce.</p>
        </div>
        <button type="button" onClick={showLogin}>OK, rozumiem!</button>
      </div>
      <div id="rooms-container" className={roomsContainerClass}>
        <p>Wybierz pokój do gry:</p>
        <div>
          {playingRooms.map(item =>
            <div key={item.playingRoomId} className={item.stateClass} onClick={e => chooseRoom(item.playingRoomId, item.stateClass)}>
              <small data-room-id={(item.playingRoomId + 1)}></small>
              <div>
                <div>{(item.playingRoomId + 1)}</div>
                <div>
                  <span>Stan: {item.stateName}</span>
                  <span>Gracze: {((item.stateClass !== 'ready' && item.stateClass !== 'preparing') ? item.players.map(subitem => <span key={subitem.playerId} className="players-text">{subitem.loginName}</span>) : 'żadnych')}</span>
                  <span>Oczekiwana ilość graczy: {((item.stateClass !== 'ready' && item.stateClass !== 'preparing') ? item.maxPlayers : 'nieustalona')}</span>
                  <span>Czas dla gracza: {((item.stateClass !== 'ready' && item.stateClass !== 'preparing') ? (Math.floor(item.durationTime / 60) + ' min. ' + ((item.durationTime % 60) >= 10 ? (Math.floor(item.durationTime % 60)) : ('0' + Math.floor(item.durationTime % 60))) + ' sek.') : 'nieokreślony')}</span>
                  <span>Najniższa karta w talii: {((item.stateClass !== 'ready' && item.stateClass !== 'preparing') ? item.lowestCard : 'nieokreślona')}</span>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      <div id="customize-container" className={customizeContainerClass}>
        <p>Dostosuj nowy pokój:</p>
        <div>
          <div>
            <big data-room-id={ownPlayingRoomId}></big>
            <div>
              <div>
                <span>Administrator:</span>
                <input type="text" id="admin-name" name="admin-name" value={ownLoginName} disabled />
              </div>
              <div>
                <span>Oczekiwana ilość graczy:</span>
                <select id="players-amount" name="players-amount" value={ownRoomMaxPlayers} onChange={e => setOwnRoomMaxPlayers(e.target.value)}>
                  <option value="2">2 &ndash; dwóch graczy</option>
                  <option value="3">3 &ndash; trzech graczy</option>
                  <option value="4">4 &ndash; czterech graczy</option>
                </select>
              </div>
              <div>
                <span>Całkowity czas dla gracza:</span>
                <input type="number" id="duration-time-mins" name="duration-time-mins" value={ownRoomDurationTimeMins} min="1" max="15" step="1" onChange={e => setOwnRoomDurationTimeMins(e.target.value)} />
                <span className="mins-label">min.</span>
                <input type="number" id="duration-time-secs" name="duration-time-secs" value={ownRoomDurationTimeSecs} min="0" max="59" step="1" onChange={e => setOwnRoomDurationTimeSecs(e.target.value)} />
                <span className="secs-label">sek.</span>
              </div>
              <div>
                <span>Najniższa karta w talii:</span>
                <select id="lowest-card" name="lowest-card" value={ownRoomLowestCard} onChange={e => setOwnRoomLowestCard(e.target.value)}>
                  <option value="2">2 &ndash; dwójka</option>
                  <option value="3">3 &ndash; trójka</option>
                  <option value="4">4 &ndash; czwórka</option>
                  <option value="5">5 &ndash; piątka</option>
                  <option value="6">6 &ndash; szóstka</option>
                </select>
              </div>
            </div>
            <hr />
            <button type="button" onClick={openRoom}>Otwórz nowy pokój!</button>
            <button type="button" onClick={returnToChooseRoom}>Przejdź do poprzedniej strony!</button>
          </div>
        </div>
      </div>
      <div id="game-container" className={gameContainerClass}>
        <div>
          <div id="table">
            <div id="start-game-alert" onClick={startGame} className={startGameAlertClass}>{(ownPlayerId !== 0) ? 'Czekaj na potwierdzenie i\u00A0rozpoczęcie gry przez administratora' : 'Wszystkie krzesła zostały zajęte.\nCzy chcesz rozpocząć grę w\u00A0obecnym składzie?'}{(ownPlayerId === 0) ? <button type="button" onClick={startGame}>Tak, rozpocznijmy grę!</button> : null}</div>
            <div id="player-bottom" className={playerBottomClass}>
              <div className="players-status">
                <div>Gracz: {(playerBottomClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'bottom').playerId).loginName : null}<br />Czas: {(playerBottomClass === 'shown') ? playersElapsedTime.find(player => player.playerId === playersSides.find(player => player.sideName === 'bottom').playerId).time : null} sek.<br />Ilość kart: {(playerBottomClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'bottom').playerId).cardsAmount : null}<br />{(playerBottomClass === 'shown' && playersSides.find(player => player.sideName === 'bottom').playerId === playingPlayerId) ? <img class="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
              </div>
              <div className="players-cards-deck">
                {generateBottomCardDeck()}
              </div>
            </div>
            <div id="player-left" className={playerLeftClass}>
            <div className="players-status">
              <div>Gracz: {(playerLeftClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'left').playerId).loginName : null}<br />Czas: {(playerLeftClass === 'shown') ? playersElapsedTime.find(player => player.playerId === playersSides.find(player => player.sideName === 'left').playerId).time : null} sek.<br />Ilość kart: {(playerLeftClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'left').playerId).cardsAmount : null}<br />{(playerBottomClass === 'shown' && playersSides.find(player => player.sideName === 'left').playerId === playingPlayerId) ? <img class="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
            </div>
              <div className="players-cards-deck">
                {generateLeftCardDeck()}
              </div>
            </div>
            <div id="player-top" className={playerTopClass}>
            <div className="players-status">
              <div>Gracz: {(playerTopClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'top').playerId).loginName : null}<br />Czas: {(playerTopClass === 'shown') ? playersElapsedTime.find(player => player.playerId === playersSides.find(player => player.sideName === 'top').playerId).time : null} sek.<br />Ilość kart: {(playerTopClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'top').playerId).cardsAmount : null}<br />{(playerBottomClass === 'shown' && playersSides.find(player => player.sideName === 'top').playerId === playingPlayerId) ? <img class="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
            </div>
              <div className="players-cards-deck">
                {generateTopCardDeck()}
              </div>
            </div>
            <div id="player-right" className={playerRightClass}>
            <div className="players-status">
              <div>Gracz: {(playerRightClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'right').playerId).loginName : null}<br />Czas: {(playerRightClass === 'shown') ? playersElapsedTime.find(player => player.playerId === playersSides.find(player => player.sideName === 'right').playerId).time : null} sek.<br />Ilość kart: {(playerRightClass === 'shown') ? playingRooms[ownPlayingRoomId].players.find(player => player.playerId === playersSides.find(player => player.sideName === 'right').playerId).cardsAmount : null}<br />{(playerBottomClass === 'shown' && playersSides.find(player => player.sideName === 'right').playerId === playingPlayerId) ? <img class="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
            </div>
              <div className="players-cards-deck">
                {generateRightCardDeck()}
              </div>
            </div>
          </div>
          <div id="aside">
            <div id="chairs">
            {(typeof playingRooms[ownPlayingRoomId] !=='undefined') ? playingRooms[ownPlayingRoomId].chairs.map((item, index) =>
              <div key={'chair-' + item.chairId} className="chair">
                <div>Krzesło {(item.chairId + 1)}</div>
                <div>{(item.playerId === 'not-available') ? <span className="chair-not-available">Niedostępne</span> : ((item.playerId === 'not-assigned' && ownChairId === null) ? <button type="button" onClick={e => sitDown(item.chairId)}>Usiądź</button> : ((item.playerId === 'not-assigned' && ownChairId !== null) ? <span className="chair-waiting">Oczekuje</span> : <span className="chair-busy">{playingRooms[ownPlayingRoomId].players.find(player => player.playerId === item.playerId).loginName}{(ownPlayerId === 0) ? <img class="remove-icon" src={removeIcon} alt="Przycisk do wyproszenia gracza" title="Wyproś tego gracza z pokoju" /> : null}</span>))}</div>
              </div>) : null
            }
            </div>
            <div id="actions">
              <div className="actions">
                <div>Wykonaj akcję</div>
                <div>
                  <button type="button" disabled>Połóż</button>
                  <button type="button" disabled>Zabierz</button>
                  <button type="button" disabled>Spasuj</button>
                </div>
              </div>
            </div>
            <div id="chat">
              <div className="chat">
                <div>Czat grupowy</div>
                <div>
                  <div id="chat-box">{chatBox.map((item, index) => <div key={'chat-' + index} title={'Czas nadania: ' + item.addTime}><strong>{item.loginName}:</strong> {item.message}</div>)}
                  </div>
                  <div>
                    <input type="text" id="chat-message" name="chat-message" autoComplete="off" size="1" maxLength="100" value={ownChatMessage} onChange={e => updateChatMessage(e.target.value)} onKeyPress={inputKeyPressToSendChatMessage} />
                    <button type="button" onClick={sendChatMessage} disabled={buttonSendChatMessageDisabled}>Wyślij</button>
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

export default App;
