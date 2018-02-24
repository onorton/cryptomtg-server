import React, { Component } from 'react';
import StackGrid from "react-stack-grid";
import AuctionItem from './AuctionItem'

export default class AuctionList extends Component {
  render(){
    const auctionItems = [{name: 'Victimize', id: 413655, highestBid: 10, endTime: new Date('2018-02-23T23:50:00'), address:'0fDffJDhhfhdje'},{name: 'Giant Mantis', id:401896, highestBid: 100, endTime: new Date('2018-02-24T12:00:00'), address:'DADffJDCUWE9hfhdje'}];

    return (
      <div>
      <button className='button'>Put up a card for auction</button>
      <StackGrid columnWidth={200}>
        {auctionItems.map((item) => <AuctionItem name={item.name} id={item.id} highestBid={item.highestBid} endTime={item.endTime} address={item.address}/>)}
      </StackGrid>

      </div>
    );
  }
}
