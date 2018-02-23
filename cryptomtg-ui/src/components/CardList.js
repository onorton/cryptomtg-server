import React, { Component } from 'react';
import StackGrid from "react-stack-grid";

export default class CardList extends Component {

  render(){
    const cards = [{name: 'Victimize', id: 413655},{name: 'Giant Mantis', id:401896}];

    return (
      <StackGrid columnWidth={200}>
        {cards.map((card) => <a target="_blank" href={'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + card.id}>
                            <img alt={card.name} style={{width:200}}  src={'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + card.id + '&type=card'}/></a>)}
      </StackGrid>
    );
  }
}
