import React from 'react';
import arrow from './arrow.svg';

function PlayerLeft(props) {
  return (
    <div className={props.playerLeftClass}>
      <div>Gracz: {(props.playerLeftClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'left').playerId).loginName : null}<br />Czas: {(props.playerLeftClass === 'shown') ? props.playersElapsedTime.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'left').playerId).time : null} sek.<br />Ilość kart: {(props.playerLeftClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'left').playerId).cardsAmount : null}<br />{(props.playerLeftClass === 'shown' && props.playersSides.find(player => player.sideName === 'left').playerId === props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
    </div>
  )
}

export default PlayerLeft;
