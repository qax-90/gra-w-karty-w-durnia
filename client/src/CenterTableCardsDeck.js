import React, { Component } from 'react';
import cards from './cards'

export default class CenterTableCardsDeck extends Component {
  render() {
    return (
      <img src={cards[this.props.centerCard[0]][this.props.centerCard[1]].src} className={(this.props.centerCard[2]) ? 'selected' : 'not-selected'} alt={cards[this.props.centerCard[0]][this.props.centerCard[1]].title} title={cards[this.props.centerCard[0]][this.props.centerCard[1]].title} style={{ transform: 'translateX(' + (this.props.centerCardIndex * 35) + '%)'}} />
    )
  }
}