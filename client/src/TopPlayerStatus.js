import React from 'react';
import arrow from './arrow.svg';

function TopPlayerStatus(props) {
  return (
    <div className={props.topPlayerClass}>
      <div>Gracz: {(props.topPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'top').playerId).loginName : null}<br />Czas: {(props.topPlayerClass === 'shown') ? props.playersElapsedTime.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'top').playerId).time : null} sek.<br />Ilość kart: {(props.topPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'top').playerId).cardsAmount : null}<br />{(props.topPlayerClass === 'shown' && props.playersSides.find(player => player.sideName === 'top').playerId === props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
    </div>
  )
}

export default TopPlayerStatus;
