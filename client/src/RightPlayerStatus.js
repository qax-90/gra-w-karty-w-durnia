import React from 'react';
import arrow from './arrow.svg';

function RightPlayerStatus(props) {
  return (
    <div className={props.rightPlayerClass}>
      <div>Gracz: {(props.rightPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'right').playerId).loginName : null}<br />Czas: {(props.rightPlayerClass === 'shown') ? props.playersElapsedTime.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'right').playerId).time : null} sek.<br />Ilość kart: {(props.rightPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'right').playerId).cardsAmount : null}<br />{(props.rightPlayerClass === 'shown' && props.playersSides.find(player => player.sideName === 'right').playerId === props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
    </div>
  )
}

export default RightPlayerStatus;
