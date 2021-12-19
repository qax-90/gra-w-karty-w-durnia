import React from 'react';
import cards from './cards'

function BottomPlayerCardsDeck(props) {
  function selectCard(cardId) {
    props.onClick(cardId);
  }
  return (
    <img src={cards[props.item[0]][props.item[1]].src} className={(props.item[2]) ? 'selected' : 'not-selected'} alt={cards[props.item[0]][props.item[1]].title} title={cards[props.item[0]][props.item[1]].title} style={{ transform: 'translateX(' + (props.index * 35) + '%)'}} onClick={e => selectCard(props.index)} />
  )
}

export default BottomPlayerCardsDeck;
