import React from 'react';
import cards from './cards'

function LeftPlayerCardsDeck(props) {
  let temp = [];
  let amount = (props.leftPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'left').playerId).cardsAmount : 0;
  for (let loop = 0; loop < amount; loop++) {
    temp.push(<img key={'left-card-' + loop} src={cards[0][0].src} alt={cards[0][0].title} title={cards[0][0].title} style={{ transform: 'translate(-50%, ' + (loop * 35 * 2 / 3) + '%) rotate(90deg)'}} />);
  }
  return temp;
}

export default LeftPlayerCardsDeck;
