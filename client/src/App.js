import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Spotify from 'spotify-web-api-js'

function App() {

  const spotifyApi = new Spotify();

  const [params, setParams] = useState();
  //  setParams({nowPlaying : params.nowPlaying})
  const [nowPlayer, setNowPlayer] = useState('')
  const [nowPlayerImage, setNowPlayerImage] = useState('')

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
        if(response){
          setNowPlayer(response.item.name)
          setNowPlayerImage(response.item.album.images[0].url)
        }
      })
  }
  return (
    <div className="App">
      <div className="Song">
        <div className="Image">
          <img className="img" alt="" src={nowPlayerImage ? nowPlayerImage : '...'} />
        </div>
          <h2 className="name">{nowPlayer ? nowPlayer : 'Não esta ouvindo música agora.'}</h2>
        <div className="container-button">
          <a href="http://localhost:8888"><button className="button">Logar no Spotify</button></a>
          <button  className="button" onClick={() => getNowPlaying()}>Ver oque estou ouvindo</button>
        </div>
      </div>
    </div>
  )
}

export default App;
