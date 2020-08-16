import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Spotify from 'spotify-web-api-js'

function App() {

  const spotifyApi = new Spotify();

  const [params, setParams] = useState();
  //  setParams({nowPlaying : params.nowPlaying})
  const [nowPlayer, setNowPlayer] = useState()
  const [nowPlayerImage, setNowPlayerImage] = useState()

  async function getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = await window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      setParams(hashParams)
      spotifyApi.setAccessToken(hashParams.access_token)
    }
    return hashParams;
  }
  useEffect(() => {
    getHashParams()
  }, [])



  function getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
          console.log(spotifyApi)
           setNowPlayer(response.item.name)
          setNowPlayerImage(response.item.album.images[0].url)
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>


        <a href="http://localhost:8888">
          <button>Logar no Spotify</button>
        </a>

        <div>
            {nowPlayer}
        </div>

        <div >
          <img className="img"  alt="" src={nowPlayerImage}/>
        </div>

        <div>
          <button onClick={() => getNowPlaying()}>
            Check Noew Playing
              </button>
        </div>
      </header>
    </div>
  );
}

export default App;
