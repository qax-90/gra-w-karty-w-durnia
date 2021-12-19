import React from 'react';
import arrow from './arrow.svg';

function BottomPlayerStatus(props) {
  return (
    <div>
      <div>Gracz: {(props.bottomPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'bottom').playerId).loginName : null}<br />Czas: {(props.bottomPlayerClass === 'shown') ? props.playersElapsedTime.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'bottom').playerId).time : null} sek.<br />Ilość kart: {(props.bottomPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'bottom').playerId).cardsAmount : null}<br />{(props.bottomPlayerClass === 'shown' && props.playersSides.find(player => player.sideName === 'bottom').playerId === props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
    </div>
  )
}

export default BottomPlayerStatus;
