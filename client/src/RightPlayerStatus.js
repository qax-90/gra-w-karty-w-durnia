import React, { Component } from 'react';
import arrow from './arrow.svg'

export default class RightPlayerStatus extends Component {
  render() {
    return (
      <div className={this.props.rightPlayerClass}>
        <div>Gracz: {(this.props.rightPlayerClass === 'shown') ? this.props.playingRooms[this.props.ownPlayingRoomId].players.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'right').playerId).loginName : null}<br />Czas: {(this.props.rightPlayerClass === 'shown') ? this.props.playersElapsedTime.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'right').playerId).time : null} sek.<br />Ilość kart: {(this.props.rightPlayerClass === 'shown') ? this.props.playingRooms[this.props.ownPlayingRoomId].players.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'right').playerId).cardsAmount : null}<br />{(this.props.rightPlayerClass === 'shown' && this.props.playersSides.find(player => player.sideName === 'right').playerId === this.props.playingPlayerId) ? <img className="arrow" src={arrow} alt="Strzałka wskazująca aktualnie grającego gracza" title="Aktualnie grający gracz" /> : null}</div>
      </div>
    )
  }
}
