import React, { Component } from 'react';
import arrow from './arrow.svg'

export default class BottomPlayerStatus extends Component {
  render() {
    return (
      <div>
        <div>Gracz: {(this.props.bottomPlayerClass === 'shown') ? this.props.playingRooms[this.props.ownPlayingRoomId].players.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'bottom').playerId).loginName : null}<br />Czas: {(this.props.bottomPlayerClass === 'shown') ? this.props.playersElapsedTime.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'bottom').playerId).time : null} sek.<br />Ilość kart: {(this.props.bottomPlayerClass === 'shown') ? this.props.playingRooms[this.props.ownPlayingRoomId].players.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'bottom').playerId).cardsAmount : null}<br />{(this.props.bottomPlayerClass === 'shown' && this.props.playersSides.find(player => player.sideName === 'bottom').playerId === this.props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
      </div>
    )
  }
}