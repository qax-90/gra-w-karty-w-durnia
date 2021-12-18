import React from 'react';
import arrow from './arrow.svg';

function PlayerRight(props) {
  return (
    <div className={props.playerRightClass}>
      <div>Gracz: {(props.playerRightClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'right').playerId).loginName : null}<br />Czas: {(props.playerRightClass === 'shown') ? props.playersElapsedTime.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'right').playerId).time : null} sek.<br />Ilość kart: {(props.playerRightClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'right').playerId).cardsAmount : null}<br />{(props.playerBottomClass === 'shown' && props.playersSides.find(player => player.sideName === 'right').playerId === props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
    </div>
  )
}

export default PlayerRight;
