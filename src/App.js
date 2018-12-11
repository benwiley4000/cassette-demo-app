import React, { Component } from 'react';
import './App.css';

import { MediaPlayer } from '@cassette/player';
import '@cassette/player/dist/css/cassette-player.css';

import playlist from './playlist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MediaPlayer showVideo playlist={playlist} />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
