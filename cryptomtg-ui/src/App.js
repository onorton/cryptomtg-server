import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
      </Tabs>
      </div>
    );
  }
}

export default App;
