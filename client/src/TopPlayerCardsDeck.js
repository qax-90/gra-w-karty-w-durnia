import React, { Component } from 'react';
import cards from './cards'

export default class TopPlayerCardsDeck extends Component {
  cardsDeck = () => {
    let temp = [];
    let amount = (this.props.topPlayerClass === 'shown') ? this.props.playingRooms[this.props.ownPlayingRoomId].players.find(player => player.playerId === this.props.playersSides.find(player => player.sideName === 'top').playerId).cardsAmount : 0;
    for (let loop = 0; loop < amount; loop++) {
      temp.push(<img key={'top-card-' + loop} src={cards[0][0].src} alt={cards[0][0].title} title={cards[0][0].title} style={{ transform: 'translateX(' + (loop * 35) + '%)'}} />);
    }
    return temp;
  }
  render() {
    return this.cardsDeck();
  }
}