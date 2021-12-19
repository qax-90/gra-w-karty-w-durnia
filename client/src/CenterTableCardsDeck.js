import React from 'react';
import cards from './cards'

function CenterTableCardsDeck(props) {
  return (
    <img src={cards[props.item[0]][props.item[1]].src} className={(props.item[2]) ? 'selected' : 'not-selected'} alt={cards[props.item[0]][props.item[1]].title} title={cards[props.item[0]][props.item[1]].title} style={{ transform: 'translateX(' + (props.index * 35) + '%)'}} />
  )
}

export default CenterTableCardsDeck;
