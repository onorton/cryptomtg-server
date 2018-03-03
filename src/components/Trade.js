import React, { Component } from 'react';
import {ModalManager} from 'react-dynamic-modal';
import AddItemDialog from './AddItemDialog'
import RemoveItemDialog from './RemoveItemDialog'

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const toastr = require('toastr');

const tradeInfo = {
  "contractName": "Trade",
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
      "inputs": [],
      "name": "tradeEnded",
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
        },
        {
          "indexed": false,
          "name": "rejecter",
          "type": "address"
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
  "bytecode": "0x60606040526000600460026101000a81548160ff021916908315150217905550341561002a57600080fd5b60405160208061189083398101604052808051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506117b9806100d76000396000f300606060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630322c4b51461009e57806307b3f5c0146100cb5780631221385b1461012e5780632852b71c146101515780632e8704af146101665780634cc5e537146101935780634dc415de146101c0578063809cd0d4146101d5578063a24e80b21461020e575b600080fd5b34156100a957600080fd5b6100b1610271565b604051808215151515815260200191505060405180910390f35b34156100d657600080fd5b6100ec6004808035906020019091905050610284565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561013957600080fd5b61014f60048080359060200190919050506102c3565b005b341561015c57600080fd5b61016461099e565b005b341561017157600080fd5b610179610ec3565b604051808215151515815260200191505060405180910390f35b341561019e57600080fd5b6101a6610ed6565b604051808215151515815260200191505060405180910390f35b34156101cb57600080fd5b6101d3610ee9565b005b34156101e057600080fd5b61020c600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611383565b005b341561021957600080fd5b61022f60048080359060200190919050506116fd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600460019054906101000a900460ff1681565b60038181548110151561029357fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061036e5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561037657fe5b600460029054906101000a900460ff1615151561039257600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561065b57600090505b600280549050811015610656578260028281548110151561040957fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663af640d0f6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156104a057600080fd5b6102c65a03f115156104b157600080fd5b505050604051805190501415610649576002818154811015156104d057fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915060028181548110151561050d57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15156105f357600080fd5b6102c65a03f1151561060457600080fd5b50505060028181548110151561061657fe5b906000526020600020900160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055610656565b80806001019150506103ec565b6108cc565b600090505b6003805490508110156108cb578260038281548110151561067d57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663af640d0f6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561071457600080fd5b6102c65a03f1151561072557600080fd5b5050506040518051905014156108be5760038181548110151561074457fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915060038181548110151561078157fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b151561086857600080fd5b6102c65a03f1151561087957600080fd5b50505060038181548110151561088b57fe5b906000526020600020900160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556108cb565b8080600101915050610660565b5b7f38c2523591a11dc147048c9508ebd3d886dbab0fb70d7eca8aed0bc099e0d6743383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a16000600460006101000a81548160ff0219169083151502179055506000600460016101000a81548160ff021916908315150217905550505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610a485750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515610a5057fe5b600460029054906101000a900460ff16151515610a6c57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610ae1576001600460006101000a81548160ff021916908315150217905550610afd565b6001600460016101000a81548160ff0219169083151502179055505b600460009054906101000a900460ff168015610b255750600460019054906101000a900460ff165b15610ec057600090505b600280549050811015610c5357600281815481101515610b4b57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b1515610c3257600080fd5b6102c65a03f11515610c4357600080fd5b5050508080600101915050610b2f565b600090505b600380549050811015610d7b57600381815481101515610c7457fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b1515610d5a57600080fd5b6102c65a03f11515610d6b57600080fd5b5050508080600101915050610c58565b6001600460026101000a81548160ff0219169083151502179055507f3912c47546656333e4dde680be8131aecab0ef201edece4660e9877dd36bea47600260036040518080602001806020018381038352858181548152602001915080548015610e3a57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610df0575b50508381038252848181548152602001915080548015610eaf57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610e65575b505094505050505060405180910390a15b50565b600460009054906101000a900460ff1681565b600460029054906101000a900460ff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610f935750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515610f9b57fe5b600460029054906101000a900460ff16151515610fb757600080fd5b600090505b6002805490508110156110df57600281815481101515610fd857fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15156110be57600080fd5b6102c65a03f115156110cf57600080fd5b5050508080600101915050610fbc565b600090505b6003805490508110156112085760038181548110151561110057fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15156111e757600080fd5b6102c65a03f115156111f857600080fd5b50505080806001019150506110e4565b6001600460026101000a81548160ff0219169083151502179055507f618c1980ae58a35d47ba5f271eec3b1c88db13a4a3d962c3c1df543853eb22d960026003336040518080602001806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183810383528681815481526020019150805480156112fa57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116112b0575b5050838103825285818154815260200191508054801561136f57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611325575b50509550505050505060405180910390a150565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061142b5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561143357fe5b600460029054906101000a900460ff1615151561144f57600080fd5b3073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156114d257600080fd5b6102c65a03f115156114e357600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1614151561150c57fe5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156115c95760028054806001018281611575919061173c565b9160005260206000209001600083909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061162d565b600380548060010182816115dd919061173c565b9160005260206000209001600083909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b7f028aea1f199dc32641a22da9c2e6c5480227c84fdeffc429a642dd9d1fc2c1723382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a16000600460006101000a81548160ff0219169083151502179055506000600460016101000a81548160ff02191690831515021790555050565b60028181548110151561170c57fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b815481835581811511611763578183600052602060002091820191016117629190611768565b5b505050565b61178a91905b8082111561178657600081600090555060010161176e565b5090565b905600a165627a7a723058200292f4486905346c3d51ea1b89022b1e787965bfe6019edfbbc63e7ebe2147890029"
}
const TradeContract = web3.eth.contract(tradeInfo.abi);

export default class Trade extends Component {
  componentWillMount() {
    const trade = this
    const opposite = (trade.props.address1 ==  trade.props.address) ? trade.props.address2 : trade.props.address1
    const tradeInstance = TradeContract.at(this.props.tradeAddress)
    tradeInstance.TradeRejected(function(error, event) {
      if(!error) {
        if (event.args.rejecter != trade.props.address) {
          toastr.warning(event.args.rejecter + " rejected the trade.")
        }
      }
    })

    tradeInstance.TradeSuccessful(function(error, event) {
      if(!error) {
        toastr.success("Congratulations! You and " + opposite + " have agreed on a trade.")

        trade.props.cards1.map((card) => {
          fetch('http://localhost:8000/cards/transfer/'+card.id, {
            method: 'PUT',
            body: JSON.stringify({address: trade.props.address2}),
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
              body: JSON.stringify({address:  trade.props.address1}),
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
          }
        ).catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
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

  accept() {
    const tradeInstance = TradeContract.at(this.props.tradeAddress)
    console.log(tradeInstance.firstAccepted())
    console.log(tradeInstance.secondAccepted())
    tradeInstance.accept({from: this.props.address, gas:100000})

  }

  reject(trade) {
    const opposite = (trade.props.address1 ==  trade.props.address) ? trade.props.address2 : trade.props.address1
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
            toastr.warning("You ended a trade with " + opposite + ".")
          }
        ).catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });

      }
    })

  }

  openRemoveItem(){
    const trade = this
    if (trade.props.address1 == trade.props.address) {
      ModalManager.open(<RemoveItemDialog address={trade.props.address} tradeAddress={trade.props.tradeAddress} cards={trade.props.cards1}/>);
    } else {
      ModalManager.open(<RemoveItemDialog address={trade.props.address} tradeAddress={trade.props.tradeAddress} cards={trade.props.cards2}/>);
    }
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
          <button className='accept' onClick={() => this.accept()}>Accept</button>
          <button className='button' onClick={() => this.openAddItem()}>Add Card</button>
          <button className='button'onClick={() => this.openRemoveItem()}>Remove Card</button>
          <button className='reject' onClick={() => this.reject(this)}>Reject</button>
        </div>
      </div>
    );
  }
}
