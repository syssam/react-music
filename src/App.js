import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Router from './router'
import './App.css';
import Player from './components/Player';

class App extends Component {
  render() {
    console.log(this.props.playList.length);
    return (
      <div className="App">
        <Router />
        { this.props.playList && this.props.playList.length > 0 && <Player /> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playList: state.player.playList
  }
}

export default withRouter(connect(
  mapStateToProps
)(App));
