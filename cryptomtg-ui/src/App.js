import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CardList from './components/CardList'
import AuctionList from './components/AuctionList'
import TradeList from './components/TradeList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Crypto Magic the Gathering</h1>
        </header>
        <Tabs>
          <TabList>
            <Tab>My Cards</Tab>
            <Tab>Cards on Auction</Tab>
            <Tab>Trades</Tab>
          </TabList>

          <TabPanel>
            <CardList/>
          </TabPanel>
          <TabPanel>
            <AuctionList/>
          </TabPanel>
          <TabPanel>
            <TradeList/>
          </TabPanel>
      </Tabs>
      </div>
    );
  }
}

export default App;
