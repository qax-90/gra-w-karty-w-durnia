import React from 'react';
import cards from './cards'

function RightPlayerCardsDeck(props) {
  let temp = [];
  let amount = (props.rightPlayerClass === 'shown') ? props.playingRooms[props.ownPlayingRoomId].players.find(player => player.playerId === props.playersSides.find(player => player.sideName === 'right').playerId).cardsAmount : 0;
  for (let loop = 0; loop < amount; loop++) {
    temp.push(<img key={'right-card-' + loop} src={cards[0][0].src} alt={cards[0][0].title} title={cards[0][0].title} style={{ transform: 'translate(-50%, ' + (loop * 35 * 2 / 3) + '%) rotate(90deg)'}} />);
  }
  return temp;
}

export default RightPlayerCardsDeck;
