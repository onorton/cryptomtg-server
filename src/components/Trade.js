import React, { Component } from 'react';
export default class Trade extends Component {

  shortenAddress(address) {
    var shortenedAddress = address.slice(0, -24) + '...'
    if (address == this.props.address) {
      shortenedAddress += ' (You)'
    }
    return shortenedAddress

  }
  render(){
    return (
      <div style={{borderStyle:'solid', borderRadius: '25px', padding: 5, borderWidth: 2}}>
      <div style={{overflow:'auto',height: 'auto', marginBottom:20, paddingLeft:20, paddingRight:20}}>
        <div style={{float:'left'}}>
          <h4>{this.shortenAddress(this.props.address1)}</h4>
          <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
           {
            this.props.cards1.map(
           (card) => <li style={{padding: '5px 0px 5px 0px'}}>  <a target="_blank" href={'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + card.id}>
                                 <img alt={card.name} style={{width:175}} src={'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + card.id + '&type=card'}/></a></li>
                   )}
           </ul>
        </div>
        <div style={{float:'right'}}>
          <h4>{this.shortenAddress(this.props.address2)}</h4>
          <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
           {
            this.props.cards2.map(
           (card) => <li style={{padding: '5px 0px 5px 0px'}}>  <a target="_blank" href={'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + card.id}>
                                 <img alt={card.name} style={{width:175}} src={'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + card.id + '&type=card'}/></a></li>
                   )}
           </ul>
        </div>
        </div>
        <div style={{bottom:10}}>
          <button className='accept'>Accept</button>
          <button className='button'>Add Card</button>
          <button className='button'>Remove Card</button>
          <button className='reject'>Reject</button>
        </div>
      </div>
    );
  }
}
