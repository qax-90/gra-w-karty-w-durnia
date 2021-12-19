import React from 'react';
import cards from './cards'

function CenterTableCardsDeck(props) {
  let temp = [];
  let amount = props.tableCardsDeck.length;
  for (let loop = 0; loop < amount; loop++) {
    temp.push(<img key={'center-card-' + loop} src={cards[props.tableCardsDeck[loop][0]][props.tableCardsDeck[loop][1]].src} alt={cards[props.tableCardsDeck[loop][0]][props.tableCardsDeck[loop][1]].title} title={cards[props.tableCardsDeck[loop][0]][props.tableCardsDeck[loop][1]].title} style={{ transform: 'translateX(' + (loop * 35) + '%)'}} />);
  }
  return temp;
}

export default CenterTableCardsDeck;
