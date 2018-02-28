import React, { Component } from 'react';
import StackGrid from "react-stack-grid";
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const toastr = require('toastr');

const cardGenerator = {
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "amountRequired",
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
      "name": "CardCreated",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "generateCard",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }
  ],
  "bytecode": "0x60606040526060604051908101604052806040805190810160405280601b81526020017f436c65726963206f662074686520466f7277617264204f72646572000000000081525081526020016040805190810160405280601181526020017f486f7572206f66205265636b6f6e696e6700000000000000000000000000000081525081526020016040805190810160405280600981526020017f56696374696d697a65000000000000000000000000000000000000000000000081525081525060009060036100cf9291906100e9565b5060018055606460025534156100e457600080fd5b610262565b828054828255906000526020600020908101928215610138579160200282015b82811115610137578251829080519060200190610127929190610149565b5091602001919060010190610109565b5b50905061014591906101c9565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061018a57805160ff19168380011785556101b8565b828001600101855582156101b8579182015b828111156101b757825182559160200191906001019061019c565b5b5090506101c591906101f5565b5090565b6101f291905b808211156101ee57600081816101e5919061021a565b506001016101cf565b5090565b90565b61021791905b808211156102135760008160009055506001016101fb565b5090565b90565b50805460018160011615610100020316600290046000825580601f10610240575061025f565b601f01602090049060005260206000209081019061025e91906101f5565b5b50565b6108a8806102716000396000f30060606040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680639eb4a35f14610051578063a26d24e31461005b575b600080fd5b610059610084565b005b341561006657600080fd5b61006e6102dc565b6040518082815260200191505060405180910390f35b6000806002543414151561009757600080fd5b600080805490506001430340600190048115156100b057fe5b068154811015156100bd57fe5b90600052602060002090019150816001546100d66102e2565b80806020018381526020018281038252848181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101625780601f1061013757610100808354040283529160200191610162565b820191906000526020600020905b81548152906001019060200180831161014557829003601f168201915b50509350505050604051809103906000f080151561017f57600080fd5b90508073ffffffffffffffffffffffffffffffffffffffff1663f2fde38b336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b151561021b57600080fd5b6102c65a03f1151561022c57600080fd5b5050506001600081548092919060010191905055507f77dfdba9e8590b6aef52020eb92549aaa1323a4e6f835f83459731bf8e41731e3382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15050565b60025481565b60405161058a806102f38339019056006060604052341561000f57600080fd5b60405161058a38038061058a83398101604052808051820191906020018051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600290805190602001906100ce9291906100dd565b50806003819055505050610182565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061011e57805160ff191683800117855561014c565b8280016001018555821561014c579182015b8281111561014b578251825591602001919060010190610130565b5b509050610159919061015d565b5090565b61017f91905b8082111561017b576000816000905550600101610163565b5090565b90565b6103f9806101916000396000f30060606040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302d05d3f1461007257806306fdde03146100c75780638da5cb5b14610155578063af640d0f146101aa578063f2fde38b146101d3575b600080fd5b341561007d57600080fd5b61008561020c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100d257600080fd5b6100da610232565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561011a5780820151818401526020810190506100ff565b50505050905090810190601f1680156101475780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016057600080fd5b6101686102d0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101b557600080fd5b6101bd6102f5565b6040518082815260200191505060405180910390f35b34156101de57600080fd5b61020a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102fb565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102c85780601f1061029d576101008083540402835291602001916102c8565b820191906000526020600020905b8154815290600101906020018083116102ab57829003601f168201915b505050505081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561035357fe5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415156103ca57806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505600a165627a7a72305820319e9e968809523527355caa409272a82a74669e8e0a214ea8d48a5daf38ffdf0029a165627a7a72305820bd04f625e8fbc0ec6533f326d617785c8f73a99319b02f0dd2308815902f08c60029"
}
const card = {
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
  "bytecode": "0x6060604052341561000f57600080fd5b60405161058a38038061058a83398101604052808051820191906020018051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600290805190602001906100ce9291906100dd565b50806003819055505050610182565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061011e57805160ff191683800117855561014c565b8280016001018555821561014c579182015b8281111561014b578251825591602001919060010190610130565b5b509050610159919061015d565b5090565b61017f91905b8082111561017b576000816000905550600101610163565b5090565b90565b6103f9806101916000396000f30060606040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302d05d3f1461007257806306fdde03146100c75780638da5cb5b14610155578063af640d0f146101aa578063f2fde38b146101d3575b600080fd5b341561007d57600080fd5b61008561020c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100d257600080fd5b6100da610232565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561011a5780820151818401526020810190506100ff565b50505050905090810190601f1680156101475780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016057600080fd5b6101686102d0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101b557600080fd5b6101bd6102f5565b6040518082815260200191505060405180910390f35b34156101de57600080fd5b61020a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102fb565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102c85780601f1061029d576101008083540402835291602001916102c8565b820191906000526020600020905b8154815290600101906020018083116102ab57829003601f168201915b505050505081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561035357fe5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415156103ca57806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505600a165627a7a72305820319e9e968809523527355caa409272a82a74669e8e0a214ea8d48a5daf38ffdf0029"
}

const generatorAddress = '0x9bab44faf1bc7c8bd0ff980b07b5cd31f251ef82'
const GeneratorContract = web3.eth.contract(cardGenerator.abi);
const CardContract = web3.eth.contract(card.abi);

export default class CardList extends Component {


  constructor(props) {
    super(props);
    this.state = {
      generator: GeneratorContract.at(generatorAddress),
      cards: []
    };
  }

  componentWillMount() {
    const cardList = this
    this.state.generator.CardCreated({owner: this.props.address}, function(error, event){
      if (!error) {
        const cardInstance = CardContract.at(event.args.card)
        cardList.saveCard(cardInstance)
      } else {
        console.log("error")
      }
    });


}

  componentDidMount() {
    const cardList = this
    if (this.props.address) {
    fetch('http://localhost:8000/cards/' + cardList.props.address + '/', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json"
      }
    }).then(function(response) {

      if (response.status == 200) {
        response.json().then(function(data) {
          cardList.setState({cards: data.cards})
        })
        }
      })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
    }

  }

  saveCard(cardInstance) {
    // Card created so save to database
    const cardList = this
    const name = cardInstance.name()
    const id = cardInstance.id()
    var cards = cardList.state.cards

    fetch('http://localhost:8000/cards/' + cardList.props.address +"/", {
      method: 'POST',
      body: JSON.stringify({name: name, id: id, address: cardInstance.address}),
      headers: {
          "Content-Type": "application/json"
      }
    }).then(function(response) {

      if (response.status == 200) {
        response.json().then(function(data) {
          cards.push({name: name, cardId: data.cardId, address:data.address});
          console.log(cards)
          cardList.setState({cards: cards})
          toastr.success("Congratulations! You have a new copy of \"" + name + "\".")
        })
      }

    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });

  }
  render(){
    web3.eth.defaultAccount = this.props.address
    return (
      <div>
      <button className='button' onClick={() => this.state.generator.generateCard({value: 100, gas: 500000})}>Get Random Card: 100</button>
      <StackGrid columnWidth={200}>
        {this.state.cards.map((card) => <a target="_blank" href={'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + card.cardId}>
                            <img alt={card.name} style={{width:200}}  src={'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + card.cardId + '&type=card'}/></a>)}
      </StackGrid>
      </div>
    );
  }
}
