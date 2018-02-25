import React, { Component } from 'react';
import './AuctionItem.css'
export default class AuctionItem extends Component {
  constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }

    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState({
        date: new Date()
      });
    }
  getTimeLeft(duration){
    if (duration < 0)
      return '00:00:00:00'
    // get total seconds between the times
    var delta = Math.round(Math.abs(duration) / 1000);

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    if (days < 10) {
      days = '0' + days
    }
    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    if (hours < 10) {
      hours = '0' + hours
    }
    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    // what's left is seconds
    var seconds = delta % 60;  // in theory the modulus is not required

    if (seconds < 10) {
      seconds = '0' + seconds
    }
   return days + ':' + hours + ':' + minutes + ':' + seconds

  }

  render(){
    const duration = this.props.endTime-this.state.date
    const durationFormatted = this.getTimeLeft(duration)
    return (
      <div>
        <h4>{this.props.name}</h4>
        <a target="_blank" href={'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + this.props.id}>
                            <img alt={this.props.name} style={{width:180}}  src={'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + this.props.id + '&type=card'}/></a>
        <p>Current Bid: {this.props.highestBid}</p>
        {
          (duration <= 60000) ? <p style={{color:'red'}}>Time Left: {durationFormatted}</p>: <p>Time Left: {durationFormatted}</p>
        }
        {(duration <= 0) ? <p> Auction Ended </p> : <button className='button'>Bid</button>}
      </div>
    );
  }
}
