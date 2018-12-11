import React, { Component } from 'react';
import './App.css';

import { MediaPlayer } from '@cassette/player';
import '@cassette/player/dist/css/cassette-player.css';

import playlist from './playlist';

function TrackPosition({ activeTrackIndex, playlist }) {
  return (
    <div
      style={{
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold'
      }}
    >
      Track {activeTrackIndex + 1} / {playlist.length}
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.snapshot = JSON.parse(localStorage.getItem('media_snapshot'));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="media_player_container">
            <MediaPlayer
              showVideo
              playlist={playlist}
              controls={[
                'spacer',
                'playpause',
                'forwardskip',
                'volume',
                'repeat',
                'shuffle',
                playerContext => (
                  <TrackPosition
                    activeTrackIndex={playerContext.activeTrackIndex}
                    playlist={playerContext.playlist}
                  />
                ),
                'spacer',
                'progress',
                'fullscreen'
              ]}
              initialStateSnapshot={this.snapshot}
              onStateSnapshot={shot => {
                localStorage.setItem('media_snapshot', JSON.stringify(shot));
              }}
            />
          </div>
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
