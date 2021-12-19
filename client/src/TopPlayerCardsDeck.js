import React from 'react';
import cards from './cards'

function TopPlayerCardsDeck(props) {
  let temp = [];
  let amount = (props.topPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'top').playerId).cardsAmount : 0;
  for (let loop = 0; loop < amount; loop++) {
    temp.push(<img key={'top-card-' + loop} src={cards[0][0].src} alt={cards[0][0].title} title={cards[0][0].title} style={{ transform: 'translateX(' + (loop * 35) + '%)'}} />);
  }
  return temp;
}

export default TopPlayerCardsDeck;
