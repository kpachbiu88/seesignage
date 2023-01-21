import React from 'react'
import { usePlaylistQuery, Playlist } from '../src/types/graphql'

import Player from './components/Player'
import Managment from './components/Managment'

import './App.css'

const App: React.FC = () => {
  const [playlist, setPlaylist] = React.useState<Playlist | null>(null)
  const [index, setIndex] = React.useState<number>(0)

  const { data, loading } = usePlaylistQuery({
    onCompleted: data => {
      console.log('LOAD CMPLETED')
      if (data?.playlist) {
        setPlaylist(data?.playlist)
        setIndex(0)
      }
    }
  })

  console.log("PLAYLIST", playlist)

  return (
    <div className="App">
      {
        data?.playlist &&
        <Player playlist={data?.playlist} index={index} setIndex={setIndex} />
      }
      {
        playlist &&
          <Managment playlist={playlist} setPlaylist={setPlaylist} />
      }
    </div>
  )
}

export default App
