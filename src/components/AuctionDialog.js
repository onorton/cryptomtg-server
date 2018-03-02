import React, { Component } from 'react';
import {Modal,Effect,ModalManager} from 'react-dynamic-modal';
import Dropdown from 'react-dropdown'
import './dropdown.css'
import './react-datetime.css'
import DateTime from 'react-datetime'
const toastr = require('toastr');
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const auctionInfo = {
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "itemSet",
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
      "name": "auctionEnd",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "beneficiary",
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
      "name": "auctionEnded",
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
      "name": "highestBidder",
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
      "name": "auctionItem",
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
      "name": "highestBid",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_auctionTime",
          "type": "uint256"
        },
        {
          "name": "minimalBid",
          "type": "uint256"
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
          "name": "bidder",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "HighestBidIncreased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "winner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "AuctionEnded",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_auctionItem",
          "type": "address"
        }
      ],
      "name": "addCard",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "bid",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdraw",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "endAuction",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x6060604052341561000f57600080fd5b604051604080610b8883398101604052808051906020019091908051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550814201600281905550806004819055505050610af3806100956000396000f3006060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630941149b146100b45780631998aeef146100e15780632a24f46c146100eb57806338af3eed146101145780633ccfd60b146101695780633dc509521461019657806386433374146101cf57806391f90157146101fc578063c2c042ca14610251578063d57bde79146102a6578063fe67a54b146102cf575b600080fd5b34156100bf57600080fd5b6100c76102e4565b604051808215151515815260200191505060405180910390f35b6100e96102f7565b005b34156100f657600080fd5b6100fe6104a5565b6040518082815260200191505060405180910390f35b341561011f57600080fd5b6101276104ab565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561017457600080fd5b61017c6104d0565b604051808215151515815260200191505060405180910390f35b34156101a157600080fd5b6101cd600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105f5565b005b34156101da57600080fd5b6101e261078e565b604051808215151515815260200191505060405180910390f35b341561020757600080fd5b61020f6107a1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561025c57600080fd5b6102646107c7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102b157600080fd5b6102b96107ed565b6040518082815260200191505060405180910390f35b34156102da57600080fd5b6102e26107f3565b005b600660019054906101000a900460ff1681565b600254421115151561030857600080fd5b6004543411151561031857600080fd5b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156103cc5760045460056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b33600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346004819055507ff4757a49b326036464bec6fe419a4ae38c8a02ce3e68bf0809674f6aab8ad300600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600454604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1565b60025481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008111156105ec576000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015156105eb5780600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600091506105f1565b5b600191505b5090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561064d57fe5b3073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156106d057600080fd5b6102c65a03f115156106e157600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1614151561070d57600080fd5b60001515600660019054906101000a900460ff16151514151561072f57600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600660016101000a81548160ff02191690831515021790555050565b600660009054906101000a900460ff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045481565b600254421015151561080457600080fd5b600660009054906101000a900460ff1615151561082057600080fd5b6001600660006101000a81548160ff0219169083151502179055507fdaec4582d5d9595688c8c98545fdd1c696d41c6aeaeb636737e84ed2f5c00eda600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663af640d0f6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561090d57600080fd5b6102c65a03f1151561091e57600080fd5b50505060405180519050604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f1935050505015156109d357600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b1515610ab157600080fd5b6102c65a03f11515610ac257600080fd5b5050505600a165627a7a72305820560747b0c8ed4ec607661f652222e87e0fcb019521579ad37b6b626c7732c2360029",
}
const cardInfo= {
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "creator",
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
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
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
      "name": "id",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x6060604052341561000f57600080fd5b60405161058a38038061058a83398101604052808051820191906020018051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600290805190602001906100ce9291906100dd565b50806003819055505050610182565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061011e57805160ff191683800117855561014c565b8280016001018555821561014c579182015b8281111561014b578251825591602001919060010190610130565b5b509050610159919061015d565b5090565b61017f91905b8082111561017b576000816000905550600101610163565b5090565b90565b6103f9806101916000396000f30060606040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302d05d3f1461007257806306fdde03146100c75780638da5cb5b14610155578063af640d0f146101aa578063f2fde38b146101d3575b600080fd5b341561007d57600080fd5b61008561020c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100d257600080fd5b6100da610232565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561011a5780820151818401526020810190506100ff565b50505050905090810190601f1680156101475780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016057600080fd5b6101686102d0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101b557600080fd5b6101bd6102f5565b6040518082815260200191505060405180910390f35b34156101de57600080fd5b61020a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102fb565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102c85780601f1061029d576101008083540402835291602001916102c8565b820191906000526020600020905b8154815290600101906020018083116102ab57829003601f168201915b505050505081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561035357fe5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415156103ca57806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505600a165627a7a723058202ea512dd9e19af8ebc8c0b553940322573d0cc4eb613acd696b680bf5697cf340029"
}
const AuctionContract = web3.eth.contract(auctionInfo.abi);
const CardContract = web3.eth.contract(cardInfo.abi);

export default class AuctionDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      card: null,
      minimumBid: null,
      date: null
    };
  }

  createAuction() {
    const auctionDialog = this
    if (!this.state.card || !this.state.minimumBid || !this.state.date) {
      toastr.error("Missing data for auction")
      return
    }

    const gasEstimate = AuctionContract.eth.estimateGas({from: this.props.address})
    const cardAddress = this.props.cards.filter((card) => card.name==this.state.card)[0].address
    const card = CardContract.at(cardAddress)
    if(this.state.date-new Date() <= 0) {
      toastr.error("Cannot set an auction date in the past.")
      return
    }


    AuctionContract.new((this.state.date-new Date())/1000,auctionDialog.state.minimumBid-1,{from: this.props.address, data:auctionInfo.bytecode, gas: 5000000},
      function(error, auction) {
        if(auction.address !== undefined) {
        // transfer ownership
        card.transferOwnership(auction.address,  {from: auctionDialog.props.address, gas: 100000})

        auction.addCard(cardAddress, {from: auctionDialog.props.address, gas: 100000})
        auction.bid({from: auctionDialog.props.address, value:auctionDialog.state.minimumBid, gas: 500000})

        fetch('http://localhost:8000/auctions/', {
          method: 'POST',
          body: JSON.stringify({id: card.id(), address: auction.address, minimumBid:auctionDialog.state.minimumBid, auctionEnd:auctionDialog.state.date}),
          headers: {
              "Content-Type": "application/json"
          }
        }).then(function(response) {

          if (response.status == 200) {
            response.json().then(function(data) {
              toastr.success("Congratulations! You have just put up a copy of \"" + card.name() + "\" up for auction.")
            })

            fetch('http://localhost:8000/cards/transfer/'+card.id(), {
              method: 'PUT',
              body: JSON.stringify({address: auction.address}),
              headers: {
                  "Content-Type": "application/json"
              }
            }).then(function(response) {


              }
            ).catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
            });

          }

        }).catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
        }
      })


    ModalManager.close()
  }



  render(){
    return (
       <Modal style={{content: {textAlign: 'center', width: '40%', height: 600}}}
          onRequestClose={() => true}
          effect={Effect.ScaleUp}>
          <h1>Auction off Card</h1>
          <h4>Select Card:</h4>
          <Dropdown style={{width:100}} value={this.state.card} onChange={(option) => this.setState({card: option.label})} options={Array.from(new Set(this.props.cards.map((card) => card.name)))} placeholder="Select an option" />
          <h4>Select Minimal Bid:</h4>
          <input type="text" onChange={(event) => this.setState({minimumBid: parseFloat(event.target.value)})}/>
          <h4>Select Auction Ending Time:</h4>
          <DateTime onChange={(date) => this.setState({date: date})}/>
          <button className='reject' onClick={ModalManager.close}>Cancel</button>
          <button className='accept' onClick={() => this.createAuction()}>Auction</button>

       </Modal>

    );
  }
}
