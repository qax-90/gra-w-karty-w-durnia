import React from 'react';
import arrow from './arrow.svg';

function LeftPlayerStatus(props) {
  return (
    <div className={props.leftPlayerClass}>
      <div>Gracz: {(props.leftPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'left').playerId).loginName : null}<br />Czas: {(props.leftPlayerClass === 'shown') ? props.playersElapsedTime.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'left').playerId).time : null} sek.<br />Ilość kart: {(props.leftPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'left').playerId).cardsAmount : null}<br />{(props.leftPlayerClass === 'shown' && props.playersSides.find(player => player.sideName === 'left').playerId === props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
    </div>
  )
}

export default LeftPlayerStatus;
