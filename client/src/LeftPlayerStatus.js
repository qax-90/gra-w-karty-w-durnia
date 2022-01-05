import React, { Component } from 'react';
import arrow from './arrow.svg'

export default class LeftPlayerStatus extends Component {
  render() {
    return (
      <div className={this.props.leftPlayerClass}>
        <div>Gracz: {(this.props.leftPlayerClass === 'shown') ? this.props.playingRooms[this.props.ownPlayingRoomId].players.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'left').playerId).loginName : null}<br />Czas: {(this.props.leftPlayerClass === 'shown') ? this.props.playersElapsedTime.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'left').playerId).time : null} sek.<br />Ilość kart: {(this.props.leftPlayerClass === 'shown') ? this.props.playingRooms[this.props.ownPlayingRoomId].players.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'left').playerId).cardsAmount : null}<br />{(this.props.leftPlayerClass === 'shown' && this.props.playersSides.find(player => player.sideName === 'left').playerId === this.props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
      </div>
    )
  }
}
