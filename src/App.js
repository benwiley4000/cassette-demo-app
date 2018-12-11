import React, { Component } from 'react';
import './App.css';

import {
  PlayerContextProvider,
  FullscreenContextProvider,
  playerContextFilter
} from '@cassette/core';
import { MediaPlayerControls } from '@cassette/player';
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

function PlaylistMenu({ playlist, activeTrackIndex, onSelectTrackIndex }) {
  return (
    <div
      style={{
        width: '280px',
        marginTop: '2rem',
        marginBottom: '2rem',
        fontSize: '1.2rem'
      }}
    >
      <h2>Select a track:</h2>
      {playlist.map((track, i) => {
        const playing = activeTrackIndex === i;
        return (
          <div
            key={i}
            style={{
              fontWeight: playing ? 'bold': undefined,
              margin: '0.5rem',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '2px solid white',
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: '2rem'
            }}
            onClick={() => onSelectTrackIndex(i)}
          >
            {playing && '▶️'} <i>{track.artist}</i> - {track.title}
          </div>
        );
      })}
    </div>
  );
}

PlaylistMenu = playerContextFilter(PlaylistMenu, [
  'playlist',
  'activeTrackIndex',
  'onSelectTrackIndex'
]);

class App extends Component {
  constructor(props) {
    super(props);
    this.snapshot = JSON.parse(localStorage.getItem('media_snapshot'));
  }

  render() {
    return (
      <div className="App">
        <PlayerContextProvider
          playlist={playlist}
          initialStateSnapshot={this.snapshot}
          onStateSnapshot={shot => {
            localStorage.setItem('media_snapshot', JSON.stringify(shot));
          }}
        >
          <header className="App-header">
            <div className="media_player_container">
              <FullscreenContextProvider>
                <MediaPlayerControls
                  showVideo
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
                />
              </FullscreenContextProvider>
            </div>
            <PlaylistMenu />
          </header>
        </PlayerContextProvider>
      </div>
    );
  }
}

export default App;
