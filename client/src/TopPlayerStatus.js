import React, { Component } from 'react';
import arrow from './arrow.svg'

export default class TopPlayerStatus extends Component {
  render() {
    return (
      <div className={this.props.topPlayerClass}>
        <div>Gracz: {(this.props.topPlayerClass === 'shown') ? this.props.playingRooms[this.props.ownPlayingRoomId].players.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'top').playerId).loginName : null}<br />Czas: {(this.props.topPlayerClass === 'shown') ? this.props.playersElapsedTime.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'top').playerId).time : null} sek.<br />Ilość kart: {(this.props.topPlayerClass === 'shown') ? this.props.playingRooms[this.props.ownPlayingRoomId].players.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'top').playerId).cardsAmount : null}<br />{(this.props.topPlayerClass === 'shown' && this.props.playersSides.find(player => player.sideName === 'top').playerId === this.props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
      </div>
    )
  }
}