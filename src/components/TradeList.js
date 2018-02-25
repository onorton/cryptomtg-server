import React, { Component } from 'react';
import StackGrid from "react-stack-grid";
import Trade from './Trade'

export default class TradeList extends Component {
  render(){
    const trades = [
      {address1: 'asdhDDD3234234', address2: 'asdasdj34234234', cards1:[{name: 'Victimize', id: 413655},{name: 'Giant Mantis', id:401896}],cards2:[{name: 'Giant Mantis', id:401896}]}
    ];

    return (
      <div>
      <button className='button'>Start Trade</button>
      <StackGrid columnWidth={450}>
        {trades.map((trade) => <Trade address1={trade.address1} address2={trade.address2} cards1={trade.cards1} cards2={trade.cards2}/>)}
      </StackGrid>

      </div>
    );
  }
}
