import React, { Component } from 'react';
import cards from './cards'

export default class BottomPlayerCardsDeck extends Component {
  selectCard = (cardId) => {
    this.props.onClick(cardId);
  }
  render() {
    return (
      <img src={cards[this.props.bottomCard[0]][this.props.bottomCard[1]].src}
      className={(this.props.bottomCard[2]) ? 'selected' : 'not-selected'}
      alt={cards[this.props.bottomCard[0]][this.props.bottomCard[1]].title}
      title={cards[this.props.bottomCard[0]][this.props.bottomCard[1]].title}
      style={{transform: 'translateX(' + (this.props.bottomCardIndex * 35) + '%)'}}
      onClick={() => this.selectCard(this.props.bottomCardIndex)} />
    )
  }
}