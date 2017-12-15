import React, { Component } from 'react';
import Header from './components/Header'
import DefaultLayout from './layouts'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DefaultLayout />
      </div>
    );
  }
}

export default App;
