import React, { Component } from 'react';
import Router from './router'
import './App.css';
import Player from './components/Player';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router />
        <Player />
      </div>
    );
  }
}

export default App;
