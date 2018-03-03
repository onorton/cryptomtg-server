import React, { Component } from 'react';
import {ModalManager} from 'react-dynamic-modal';
import AddItemDialog from './AddItemDialog'

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const toastr = require('toastr');

const tradeInfo = {
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "secondAccepted",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "secondTradeItems",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "firstAccepted",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "firstTradeItems",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_secondParty",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "card",
          "type": "address"
        }
      ],
      "name": "ItemAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "card",
          "type": "address"
        }
      ],
      "name": "ItemRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "firstCards",
          "type": "address[]"
        },
        {
          "indexed": false,
          "name": "secondCards",
          "type": "address[]"
        }
      ],
      "name": "TradeSuccessful",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "firstCards",
          "type": "address[]"
        },
        {
          "indexed": false,
          "name": "secondCards",
          "type": "address[]"
        }
      ],
      "name": "TradeRejected",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "card",
          "type": "address"
        }
      ],
      "name": "addTradeItem",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "removeTradeItem",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "accept",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "reject",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x6060604052341561000f57600080fd5b60405160208061176883398101604052808051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506116ac806100bc6000396000f30060606040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630322c4b51461009357806307b3f5c0146100c05780631221385b146101235780632852b71c146101465780632e8704af1461015b5780634dc415de14610188578063809cd0d41461019d578063a24e80b2146101d6575b600080fd5b341561009e57600080fd5b6100a6610239565b604051808215151515815260200191505060405180910390f35b34156100cb57600080fd5b6100e1600480803590602001909190505061024c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561012e57600080fd5b610144600480803590602001909190505061028b565b005b341561015157600080fd5b61015961094a565b005b341561016657600080fd5b61016e610e50565b604051808215151515815260200191505060405180910390f35b341561019357600080fd5b61019b610e63565b005b34156101a857600080fd5b6101d4600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611292565b005b34156101e157600080fd5b6101f760048080359060200190919050506115f0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600460019054906101000a900460ff1681565b60038181548110151561025b57fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806103365750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561033e57fe5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561060757600090505b60028054905081101561060257826002828154811015156103b557fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663af640d0f6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561044c57600080fd5b6102c65a03f1151561045d57600080fd5b5050506040518051905014156105f55760028181548110151561047c57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691506002818154811015156104b957fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b151561059f57600080fd5b6102c65a03f115156105b057600080fd5b5050506002818154811015156105c257fe5b906000526020600020900160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055610602565b8080600101915050610398565b610878565b600090505b600380549050811015610877578260038281548110151561062957fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663af640d0f6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156106c057600080fd5b6102c65a03f115156106d157600080fd5b50505060405180519050141561086a576003818154811015156106f057fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915060038181548110151561072d57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b151561081457600080fd5b6102c65a03f1151561082557600080fd5b50505060038181548110151561083757fe5b906000526020600020900160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055610877565b808060010191505061060c565b5b7f38c2523591a11dc147048c9508ebd3d886dbab0fb70d7eca8aed0bc099e0d6743383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a16000600460006101000a81548160ff0219169083151502179055506000600460016101000a81548160ff021916908315150217905550505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806109f45750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15156109fc57fe5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610a71576001600460006101000a81548160ff021916908315150217905550610a8d565b6001600460016101000a81548160ff0219169083151502179055505b600460009054906101000a900460ff168015610ab55750600460019054906101000a900460ff165b15610e4d577f3912c47546656333e4dde680be8131aecab0ef201edece4660e9877dd36bea47600260036040518080602001806020018381038352858181548152602001915080548015610b5e57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610b14575b50508381038252848181548152602001915080548015610bd357602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610b89575b505094505050505060405180910390a1600090505b600280549050811015610d0c57600281815481101515610c0457fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b1515610ceb57600080fd5b6102c65a03f11515610cfc57600080fd5b5050508080600101915050610be8565b600090505b600380549050811015610e3457600381815481101515610d2d57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b1515610e1357600080fd5b6102c65a03f11515610e2457600080fd5b5050508080600101915050610d11565b3073ffffffffffffffffffffffffffffffffffffffff16ff5b50565b600460009054906101000a900460ff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610f0d5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515610f1557fe5b600090505b60028054905081101561103d57600281815481101515610f3657fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b151561101c57600080fd5b6102c65a03f1151561102d57600080fd5b5050508080600101915050610f1a565b600090505b6003805490508110156111665760038181548110151561105e57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b151561114557600080fd5b6102c65a03f1151561115657600080fd5b5050508080600101915050611042565b7f364a0a5276bcd67ee0d1bf830073f9bc0882dc4fbf99646ccc22979379016fc860026003604051808060200180602001838103835285818154815260200191508054801561120a57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116111c0575b5050838103825284818154815260200191508054801561127f57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611235575b505094505050505060405180910390a150565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061133a5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561134257fe5b3073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156113c557600080fd5b6102c65a03f115156113d657600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff161415156113ff57fe5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156114bc5760028054806001018281611468919061162f565b9160005260206000209001600083909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050611520565b600380548060010182816114d0919061162f565b9160005260206000209001600083909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b7f028aea1f199dc32641a22da9c2e6c5480227c84fdeffc429a642dd9d1fc2c1723382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a16000600460006101000a81548160ff0219169083151502179055506000600460016101000a81548160ff02191690831515021790555050565b6002818154811015156115ff57fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b81548183558181151161165657818360005260206000209182019101611655919061165b565b5b505050565b61167d91905b80821115611679576000816000905550600101611661565b5090565b905600a165627a7a723058201945ed3ec04d51fbd5712818f7fd4237a1622962b406accad8f9c9657d4c01700029"
}
const TradeContract = web3.eth.contract(tradeInfo.abi);

export default class Trade extends Component {
  componentWillMount() {
    const trade = this
    const tradeInstance = TradeContract.at(this.props.tradeAddress)
    tradeInstance.TradeRejected(function(error, event) {
      if(!error) {
        if (event.args.rejecter != trade.props.address) {
          toastr.warning(event.args.rejecter + " rejected the trade.")
        }
      }
    })
  }

  shortenAddress(address) {
    var shortenedAddress = address.slice(0, -24) + '...'
    if (address == this.props.address) {
      shortenedAddress += ' (You)'
    }
    return shortenedAddress


  }

  reject(trade) {
    const tradeInstance = TradeContract.at(trade.props.tradeAddress)
    tradeInstance.reject({from: trade.props.address, gas:100000},
    function(error, transaction) {
      if (!error) {
        // transfer cards back
        trade.props.cards1.map((card) => {
          fetch('http://localhost:8000/cards/transfer/'+card.id, {
            method: 'PUT',
            body: JSON.stringify({address: trade.props.address1}),
            headers: {
                "Content-Type": "application/json"
            }
          }).then(function(response) {


            }
          ).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
          });
        })

        trade.props.cards2.map((card) => {
            fetch('http://localhost:8000/cards/transfer/'+card.id, {
              method: 'PUT',
              body: JSON.stringify({address:  trade.props.address2}),
              headers: {
                  "Content-Type": "application/json"
              }
            }).then(function(response) {


              }
            ).catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        })

        fetch('http://localhost:8000/trades/'+trade.props.address + '/', {
          method: 'DELETE',
          body: JSON.stringify({address:  trade.props.tradeAddress}),
          headers: {
              "Content-Type": "application/json"
          }
        }).then(function(response) {
            toastr.warning("You ended a trade with " + trade.props.address2 + ".")
          }
        ).catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });

      }
    })

  }

  openAddItem(){
    const trade = this
    fetch('http://localhost:8000/cards/' + trade.props.address +'/', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json"
      }
    }).then(function(response) {
      if (response.status == 200) {
        response.json().then(function(data) {
          ModalManager.open(<AddItemDialog address={trade.props.address} tradeAddress={trade.props.tradeAddress} cards={data.cards}/>);
        })
        }
      })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
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
           (card) => <li style={{padding: '5px 0px 5px 0px'}}>  <a target="_blank" href={'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + card.cardId}>
                                 <img alt={card.name} style={{width:175}} src={'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + card.cardId + '&type=card'}/></a></li>
                   )}
           </ul>
        </div>
        <div style={{float:'right'}}>
          <h4>{this.shortenAddress(this.props.address2)}</h4>
          <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
           {
            this.props.cards2.map(
           (card) => <li style={{padding: '5px 0px 5px 0px'}}>  <a target="_blank" href={'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + card.cardId}>
                                 <img alt={card.name} style={{width:175}} src={'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + card.cardId + '&type=card'}/></a></li>
                   )}
           </ul>
        </div>
        </div>
        <div style={{bottom:10}}>
          <button className='accept'>Accept</button>
          <button className='button' onClick={() => this.openAddItem()}>Add Card</button>
          <button className='button'>Remove Card</button>
          <button className='reject' onClick={() => this.reject(this)}>Reject</button>
        </div>
      </div>
    );
  }
}
