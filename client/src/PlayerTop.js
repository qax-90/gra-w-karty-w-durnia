import React from 'react';
import arrow from './arrow.svg';

function PlayerTop(props) {
  return (
    <div className={props.playerTopClass}>
      <div>Gracz: {(props.playerTopClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'top').playerId).loginName : null}<br />Czas: {(props.playerTopClass === 'shown') ? props.playersElapsedTime.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'top').playerId).time : null} sek.<br />Ilość kart: {(props.playerTopClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'top').playerId).cardsAmount : null}<br />{(props.playerBottomClass === 'shown' && props.playersSides.find(player => player.sideName === 'top').playerId === props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
    </div>
  )
}

export default PlayerTop;
