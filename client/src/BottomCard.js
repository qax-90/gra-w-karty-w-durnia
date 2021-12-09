import React from 'react';
import cards from './cards'

function BottomCard(props) {
  function selectCard(cardId) {
    props.onClick(cardId);
  }
  return (
    <img src={cards[props.item[0]][props.item[1]].src} title={cards[props.item[0]][props.item[1]].title} className={(props.item[2]) ? 'selected' : 'not-selected'} style={{ transform: 'translateX(' + (props.index * 35) + '%)'}} onClick={e => selectCard(props.index)} />
  )
}

export default BottomCard;
